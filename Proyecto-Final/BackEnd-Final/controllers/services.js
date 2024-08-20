const Service = require("../models/services");
const Category = require("../models/categories");
const TechnicalProfile =require("../models/technicalProfiles")

const createService = async (req, res) => {
    try {
      const { title, description, price, category_id, service_image } = req.body;
  
      // Validar que se hayan enviado los datos requeridos
      if (!title || !description || !price || !category_id) {
        return res.status(400).json({
          status: 'error',
          message: 'Faltan datos por enviar',
        });
      }
  
      // Verificar si la categoría existe
      const category = await Category.findOne({ id_categories: category_id });
      if (!category) {
        return res.status(400).json({
          status: 'error',
          message: 'Categoría no encontrada',
        });
      }
  
      // Obtener el perfil técnico del usuario autenticado
      const technicalProfile = await TechnicalProfile.findOne({ user_id: req.user.id });
      if (!technicalProfile) {
        return res.status(400).json({
          status: 'error',
          message: 'Perfil técnico no encontrado',
        });
      }
  
      // Crear el nuevo servicio
      const newService = new Service({
        profile_id: technicalProfile._id, // Usar ObjectId del perfil técnico
        title,
        description,
        price,
        category_id: category._id, // Asignar ObjectId de la categoría encontrada
        service_image,
      });
  
      // Guardar el servicio en la base de datos
      const savedService = await newService.save();
  
      return res.status(201).json({
        status: 'success',
        message: 'Servicio creado correctamente',
        service: savedService,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al crear el servicio',
        error: error.message,
      });
    }
  };
  

const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("category_id", "name");

    return res.status(200).json({
      status: "success",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los servicios",
      error: error.message,
    });
  }
};
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "category_id",
      "name"
    );

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el servicio",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const {
      profile_id,
      title,
      description,
      price,
      category_id,
      service_image,
    } = req.body;

    // Validar que se hayan enviado los datos requeridos
    if (!profile_id || !title || !description || !price || !category_id) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    // Verificar si la categoría existe
    const category = await Category.findOne({ id_categories: category_id });
    if (!category) {
      return res.status(400).json({
        status: "error",
        message: "Categoría no encontrada",
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        profile_id,
        title,
        description,
        price,
        category_id: category._id, // Asignar ObjectId de la categoría encontrada
        service_image,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Servicio actualizado correctamente",
      service: updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el servicio",
      error: error.message,
    });
  }
};
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Servicio eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar el servicio",
      error: error.message,
    });
  }
};

//exportar
module.exports = {
  createService: createService,
  getServices: getServices,
  getServiceById: getServiceById,
  updateService: updateService,
  deleteService: deleteService,
};
