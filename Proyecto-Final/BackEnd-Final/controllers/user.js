const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const mongoosePagination = require("mongoose-pagination");
const fs = require("fs");
const path = require("path");
//importar servicios
const jwt = require("../services/jwt");

//prueba
const pruebaUser = (req, res) => {
  return res.status(200).json({
    message: "Mensaje enviado desde USER",
  });
};
//registro de usuarios
const register = async (req, res) => {
  // Recoger datos de la petición
  let params = req.body;
  let profileImage = req.file ? req.file.filename : "default.png";

  // Comprobar que me llegan los datos necesarios
  if (
    !params.first_name ||
    !params.last_name ||
    !params.email ||
    !params.nick ||
    !params.password ||
    !params.num_user
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "Faltan datos por enviar" });
  }

  // Control usuarios duplicados
  try {
    const users = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (users && users.length >= 1) {
      return res
        .status(200)
        .send({ status: "success", message: "El usuario ya existe" });
    }

    // Cifrar la contraseña
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    const id_roleNum = 2;
    // Buscar y asignar rol por id_roleNum
    const role = await Role.findOne({ id_roleNum: id_roleNum });
    if (!role) {
      return res
        .status(400)
        .json({ status: "error", message: "Rol no encontrado" });
    }

    // Crear objeto de usuario
    let userToSave = new User({
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email.toLowerCase(),
      nick: params.nick.toLowerCase(),
      password: params.password,
      num_user: params.num_user,
      profile_image: profileImage,
      roles: [role._id], // Asignar ObjectId del rol encontrado
    });

    // Guardar usuario en la base de datos
    try {
      const userRegister = await userToSave.save();
      return res.status(200).json({
        status: "success",
        message: "El usuario se registró correctamente",
        user: userRegister,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al guardar el usuario",
        error: error.message,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error en la consulta de usuarios" });
  }
};

/* --------------------------------------------------------------------------------------------- */
const login = async (req, res) => {
  //recoger parametros
  let params = req.body;
  if (!params.email || !params.password) {
    return res
      .status(400)
      .send({ status: "error", message: "Faltan datos por enviar" });
  }
  //buscar en bse si existe
  try {
    // Buscar usuario por email
    const user = await User.findOne({ email: params.email }).populate(
      "roles",
      "role_name"
    ); // Poblar el campo 'roles' y seleccionar solo 'role_name'
    /* .select({ password: 0 }) */

    // Si no se encuentra el usuario, devolver un error
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No existe el usuario",
      });
    }

    // Aquí puedes agregar la lógica para comparar la contraseña
    const pws = bcrypt.compareSync(params.password, user.password);

    if (!pws) {
      return res.status(400).send({
        status: "error",
        message: "No te has identificado correctamente",
      });
    }
    // y generar un token si es correcta
    const token = jwt.createToken(user);
    // Devolver los datos del usuario
    return res.status(200).json({
      status: "success",
      message: "Esta correcta la identificacion",
      user: {
        id: user._id,
        first_name: user.first_name,
        nick: user.nick,
        role_name: user.roles.map((role) => role.role_name),
      },
      token,
    });
  } catch (error) {
    // Manejar errores
    return res.status(500).json({
      status: "error",
      message: "Error en la consulta de usuarios",
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    // Recibir parámetro id por la URL
    const id = req.params.id;

    // Consulta para sacar los datos del usuario
    const userProfile = await User.findById(id).select({
      password: 0,
      role: 0,
    });
    //info se seguimiento

    /*       const followInfo = await followService.followThisUser(req.user.id, id); */

    // Si no se encuentra el usuario, devolver un error
    if (!userProfile) {
      return res.status(404).json({
        status: "error",
        message: "El usuario no existe",
      });
    }

    // Devolver los datos del usuario
    return res.status(200).json({
      status: "success",
      user: userProfile,
      message: "funcionado",
      /*         following: followInfo.following,
        follower: followInfo.follower, */
    });
  } catch (error) {
    // Manejar errores
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el perfil del usuario",
      error: error.message,
    });
  }
};
const list = async (req, res) => {
  try {
    // Controlar la página
    let page = 1;
    if (req.params.page) {
      page = parseInt(req.params.page);
    }

    // Número de elementos por página
    const itemPerPage = 5;

    // Calcular el índice de inicio y final de la página actual
    const startIndex = (page - 1) * itemPerPage;

    // Consultar usuarios y contar el total
    const users = await User.find()
      .sort("_id")
      .select("-password -email -role -__v")
      .skip(startIndex)
      .limit(itemPerPage);

    const totalUsers = await User.countDocuments();

    /*       let followUserIds = await followService.followUserIds(req.user.id); */

    // Devolver resultado
    return res.status(200).json({
      status: "success",
      page: page,
      itemPerPage: itemPerPage,
      total: totalUsers,
      users: users,
      totalPages: Math.ceil(totalUsers / itemPerPage),
      /*         user_following: followUserIds.following,
        user_follow_me: followUserIds.followers, */
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener la lista de usuarios",
      error: error.message,
    });
  }
};
const update = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ status: "error", message: "ID de usuario no proporcionado." });
    }

    // Recoger información del usuario a actualizar desde el cuerpo de la solicitud
    let userToUpdate = req.body;

    // Eliminar campos innecesarios
    delete userToUpdate.iat;
    delete userToUpdate.exp;

    // Verificar y agregar el campo roles
    if (userToUpdate.roles) {
      const roleExists = await Role.findById(userToUpdate.roles);
      if (!roleExists) {
        return res.status(400).json({ status: "error", message: "El rol especificado no existe." });
      }
    }

    // Comprobar si el usuario ya existe
    const users = await User.find({
      $or: [
        { email: userToUpdate.email.toLowerCase() },
        { nick: userToUpdate.nick.toLowerCase() },
      ],
    });

    let userIsset = false;
    users.forEach((user) => {
      if (user && user._id.toString() !== userId) {
        userIsset = true;
      }
    });

    if (userIsset) {
      return res.status(200).json({
        status: "error",
        message: "El usuario ya existe con el mismo email o nick.",
        userToUpdate,
      });
    }

    // Verificar si hay un archivo de imagen en la solicitud
    if (req.file) {
      // Guardar la ruta del archivo en el campo 'profile_image' del usuario
      userToUpdate.profile_image = req.file.filename;
    }

    // Actualizar el usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...userToUpdate, updated_at: Date.now() },
      { new: true, runValidators: true }
    ).populate("roles");

    return res.status(200).json({ status: "success", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Error al actualizar el usuario." });
  }
};


const upload = async (req, res) => {
  try {
    // Verificar si hay un archivo
    if (!req.file) {
      return res.status(404).json({
        status: "error",
        message: "La petición no tiene imagen",
      });
    }

    // Obtener el nombre del archivo
    const image = req.file.originalname;

    // Extraer la extensión del archivo
    const imageSplit = image.split(".");
    const extension = imageSplit[imageSplit.length - 1].toLowerCase();

    // Comprobar si la extensión es válida
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
    if (!allowedExtensions.includes(extension)) {
      fs.unlinkSync(req.file.path); // Borrar el archivo si no es válido
      return res.status(400).json({
        status: "error",
        message: "Extensión del fichero incorrecta",
      });
    }

    // Construir la ruta de la imagen (relativa)
    const imagePath = `uploads/${req.file.filename}`;

    // Actualizar la imagen de perfil en la base de datos
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.user.id },
      { profile_image: imagePath },  // Guardar la ruta completa o relativa
      { new: true }
    );

    if (!userUpdate) {
      return res.status(500).json({
        status: "error",
        message: "Error en la subida del avatar",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Subida de imagen exitosa",
      user: userUpdate,
      file: req.file,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error en la subida del avatar",
      error: error.message,
    });
  }
};

const avatar = (req, res) => {
  //sacar el parametro de la url
  const file = req.params.file;
  //montar el path real de la imagen
  const filePath = "./uploads/avatars/" + file;
  //comprobar que existe
  fs.stat(filePath, (error, existe) => {
    if (!existe) {
      return res
        .status(404)
        .send({ status: "error", massage: "no existe la imagen" });
    }
    //devolver un file

    return res.sendFile(path.resolve(filePath));
  });
};
//exportar
module.exports = {
  pruebaUser: pruebaUser,
  register: register,
  login: login,
  profile: profile,
  list: list,
  update: update,
  upload: upload,
  avatar: avatar,
};
