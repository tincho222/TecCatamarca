const TechnicalProfile = require("../models/technicalProfiles");
const Role = require("../models/role");
const jwt = require("../services/jwt");
const User = require("../models/user");
const fs = require("fs");
const { BASE_URL } = require("../database/config");
// Prueba
const prueba = (req, res) => {
  return res.status(200).json({
    message: "Mensaje enviado desde TechnicalProfile",
  });
};

// Crear Perfil Técnico
const createTechnicalProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Verificar si el usuario ya tiene un perfil técnico
    const existingProfile = await TechnicalProfile.findOne({ user_id: userId });

    if (existingProfile) {
      return res.status(400).json({
        status: "error",
        message: "El usuario ya tiene un perfil técnico creado",
      });
    }

    // Recoger los datos del cuerpo de la solicitud
    const {
      local_name,
      bio,
      skills,
      rating,
      email_technical,
      num_technical,
      address,
      category_id,
    } = req.body;

    // Recoger y analizar el campo location
    const location = JSON.parse(req.body.location || "{}");

    // Verificar que todos los campos necesarios estén presentes
    if (
      !local_name ||
      !rating ||
      !email_technical ||
      !num_technical ||
      !location ||
      !address ||
      !category_id // Verificar que category_id esté presente
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "Faltan datos por enviar" });
    }

    // Verificar que la ubicación tenga el formato correcto
    if (
      !location.type ||
      location.type !== "Point" ||
      !Array.isArray(location.coordinates) ||
      location.coordinates.length !== 2
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "Ubicación inválida" });
    }

    // Recoger el archivo del formulario y construir la URL completa
    const profileImage = req.file
      ? `${BASE_URL}/uploads/avatars_technical/${req.file.filename}`
      : null;

    // Crear el perfil técnico utilizando los datos proporcionados
    const technicalProfile = new TechnicalProfile({
      user_id: userId,
      local_name,
      bio,
      skills,
      rating,
      email_technical,
      profile_image: profileImage, // Ruta completa del archivo guardada en la base de datos
      num_technical,
      location,
      address,
      category_id, // Añadido el campo de categorías
    });

    // Guardar el perfil técnico en la base de datos
    const savedProfile = await technicalProfile.save();

    // Buscar y asignar el rol 'technical' (id_roleNum: 3)
    const roleTechnical = await Role.findOne({ id_roleNum: 3 });
    if (!roleTechnical) {
      return res.status(400).json({
        status: "error",
        message: "Rol técnico no encontrado",
      });
    }

    // Actualizar el rol del usuario
    await User.findByIdAndUpdate(userId, { roles: [roleTechnical._id] });

    // Recuperar el usuario actualizado con el rol incluido
    const updatedUser = await User.findById(userId).populate("roles");

    // Devolver una respuesta de éxito
    return res.status(201).json({
      status: "success",
      message: "Perfil técnico creado correctamente y rol actualizado a 'technical'",
      profileId: savedProfile._id, // Aseguramos devolver solo el ID también
      profile: savedProfile,
      user: updatedUser // Usuario actualizado con el nuevo rol
    });
  } catch (error) {
    // Manejar errores
    return res.status(500).json({
      status: "error",
      message: "Error al crear perfil técnico",
      error: error.message,
    });
  }
};

// Obtener Perfiles Técnicos

const getTechnicalProfiles = async (req, res) => {
  try {
    let page = 1;
    if (req.params.page) {
      page = parseInt(req.params.page);
    }

    const itemPerPage = 100;
    const startIndex = (page - 1) * itemPerPage;

    const technicalProfiles = await TechnicalProfile.find()
      .sort("_id")
      .skip(startIndex)
      .limit(itemPerPage)
      .populate("user_id", "nick");

    const updatedProfiles = technicalProfiles.map((profile) => {
      if (profile.profile_image && !profile.profile_image.startsWith("http")) {
        profile.profile_image = `${BASE_URL}/uploads/avatars_technical/${profile.profile_image}`;
      }
      return profile;
    });

    const totalTechnicalProfiles = await TechnicalProfile.countDocuments();

    return res.status(200).json({
      status: "success",
      page: page,
      itemPerPage: itemPerPage,
      totalTechnicalProfiles: totalTechnicalProfiles,
      technicalProfiles: updatedProfiles,
      totalPages: Math.ceil(totalTechnicalProfiles / itemPerPage),
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener la lista de perfiles técnicos",
      error: error.message,
    });
  }
};

// Obtener Perfil Técnico por ID
const getTechnicalProfileById = async (req, res) => {
  try {
    const profile = await TechnicalProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Perfil técnico no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener perfil técnico",
      error: error.message,
    });
  }
};
// Actualizar Perfil Técnico
const updateTechnicalProfile = async (req, res) => {
  try {
      const {
          user_id,
          local_name,
          bio,
          skills,
          rating,
          email_technical,
          num_technical,
          address,
          category_id,
          longitude,
          latitude,
      } = req.body;

      const file = req.file; // Obtiene el archivo, si existe

      // Busca el perfil existente
      const existingProfile = await TechnicalProfile.findById(req.params.id);
      if (!existingProfile) {
          return res.status(404).json({ status: "error", message: "Perfil técnico no encontrado." });
      }

      // Si no se envía un archivo nuevo, conserva el archivo de imagen actual
      const profileImage = file ? file.filename : existingProfile.profile_image;

      const updatedProfile = await TechnicalProfile.findByIdAndUpdate(
          req.params.id,
          {
              user_id,
              local_name,
              bio,
              skills,
              rating,
              email_technical,
              num_technical,
              address,
              category_id,
              location: {
                  type: "Point",
                  coordinates: [longitude, latitude],
              },
              profile_image: profileImage, // Usa la imagen actual o la nueva
          },
          { new: true, runValidators: true }
      );

      return res.status(200).json({ status: "success", profile: updatedProfile });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Error al actualizar el perfil técnico." });
  }
};

// Eliminar Perfil Técnico
const deleteTechnicalProfile = async (req, res) => {
  try {
    const profileDeleted = await TechnicalProfile.findByIdAndDelete(
      req.params.id
    );
    if (!profileDeleted)
      return res
        .status(404)
        .json({ status: "error", message: "Perfil técnico no encontrado" });

    return res.status(200).json({
      status: "success",
      message: "Perfil técnico eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar perfil técnico",
      error: error.message,
    });
  }
};

const uploadTechnicalProfile = async (req, res) => {
  try {
    // Recoger el fichero de imagen
    if (!req.file) {
      return res.status(404).json({
        status: "error",
        message: "La petición no tiene imagen",
      });
    }

    // Conseguir el nombre del archivo
    const image = req.file.originalname;

    // Sacar la extensión del archivo
    const imageSplit = image.split(".");
    const extension = imageSplit[imageSplit.length - 1];

    // Comprobar si la extensión es correcta
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
    if (!allowedExtensions.includes(extension.toLowerCase())) {
      const filePath = req.file.path;
      fs.unlinkSync(filePath); // Borrar el archivo si la extensión no es válida

      return res.status(400).json({
        status: "error",
        message: "Extensión del fichero incorrecta",
      });
    }

    // Guardar en la base de datos
    const technicalProfileUpdate = await TechnicalProfile.findOneAndUpdate(
      { user_id: req.user.id }, // Suponiendo que el perfil técnico está asociado al user_id
      { profile_image: req.file.filename },
      { new: true }
    );

    if (!technicalProfileUpdate) {
      return res.status(500).json({
        status: "error",
        message: "Error en la subida de la imagen",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Subida de imagen exitosa",
      technicalProfile: technicalProfileUpdate,
      file: req.file,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error en la subida de la imagen",
      error: error.message,
    });
  }
};
// Exportar
module.exports = {
  prueba,
  createTechnicalProfile,
  getTechnicalProfiles,
  getTechnicalProfileById,
  updateTechnicalProfile,
  deleteTechnicalProfile,
  uploadTechnicalProfile,
};
