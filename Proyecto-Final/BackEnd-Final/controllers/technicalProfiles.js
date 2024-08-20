const TechnicalProfile = require("../models/technicalProfiles");
const jwt = require("../services/jwt");
const User = require("../models/user");
const fs = require("fs");
// Prueba
const prueba = (req, res) => {
  return res.status(200).json({
    message: "Mensaje enviado desde TechnicalProfile",
  });
};

// Crear Perfil Técnico
const createTechnicalProfile = async (req, res) => {
  try {
    // Extraer el ID de usuario del token JWT
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
    let params = req.body;
    const {
      local_name,
      bio,
      skills,
      rating,
      email_technical,
      profile_image,
      num_technical,
      location,
      address,
    } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (
      !local_name ||
      !rating ||
      !email_technical ||
      !num_technical ||
      !location ||
      !address
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

    // Crear el perfil técnico utilizando los datos proporcionados
    const technicalProfile = new TechnicalProfile({
      user_id: userId,
      local_name,
      bio,
      skills,
      rating,
      email_technical,
      profile_image,
      num_technical,
      location,
      address,
    });

    // Guardar el perfil técnico en la base de datos
    const savedProfile = await technicalProfile.save();

    // Devolver una respuesta de éxito
    return res.status(201).json({
      status: "success",
      message: "Perfil técnico creado correctamente",
      profile: savedProfile,
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
    // Controlar la página
    let page = 1;
    if (req.params.page) {
      page = parseInt(req.params.page);
    }

    // Número de elementos por página
    const itemPerPage = 5;

    // Calcular el índice de inicio y final de la página actual
    const startIndex = (page - 1) * itemPerPage;

    // Consultar perfiles técnicos y contar el total, incluyendo el nombre del usuario asociado
    const technicalProfiles = await TechnicalProfile.find()
      .sort("_id")
      .skip(startIndex)
      .limit(itemPerPage)
      .populate("user_id", "nick");

    const totalTechnicalProfiles = await TechnicalProfile.countDocuments();

    // Devolver resultado
    return res.status(200).json({
      status: "success",
      page: page,
      itemPerPage: itemPerPage,
      totalTechnicalProfiles: totalTechnicalProfiles,
      technicalProfiles: technicalProfiles,
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
    const params = req.body;

    if (params.latitude && params.longitude) {
      params.location = {
        type: "Point",
        coordinates: [params.longitude, params.latitude],
      };
    }

    params.updated_at = Date.now();

    const profileUpdated = await TechnicalProfile.findByIdAndUpdate(
      req.params.id,
      params,
      { new: true }
    );
    if (!profileUpdated)
      return res
        .status(404)
        .json({ status: "error", message: "Perfil técnico no encontrado" });

    return res.status(200).json({
      status: "success",
      message: "Perfil técnico actualizado correctamente",
      profile: profileUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar perfil técnico",
      error: error.message,
    });
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
