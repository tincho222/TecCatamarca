// controllers/categoryController.js
const Category = require('../models/categories');

const createCategory = async (req, res) => {
  try {
    const { id_categories, name, description } = req.body;

    // Validar que se hayan enviado los datos requeridos
    if (!id_categories || !name) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan datos por enviar',
      });
    }

    // Crear la nueva categoría
    const newCategory = new Category({
      id_categories,
      name,
      description,
    });

    // Guardar la categoría en la base de datos
    const savedCategory = await newCategory.save();

    return res.status(201).json({
      status: 'success',
      message: 'Categoría creada correctamente',
      category: savedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al crear la categoría',
      error: error.message,
    });
  }
};
const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
  
      return res.status(200).json({
        status: 'success',
        categories,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al obtener las categorías',
        error: error.message,
      });
    }
  };
  const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
  
      if (!category) {
        return res.status(404).json({
          status: 'error',
          message: 'Categoría no encontrada',
        });
      }
  
      return res.status(200).json({
        status: 'success',
        category,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al obtener la categoría',
        error: error.message,
      });
    }
  };

  const updateCategory = async (req, res) => {
    try {
      const { id_categories, name, description } = req.body;
  
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          id_categories,
          name,
          description,
          updated_at: Date.now(),
        },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({
          status: 'error',
          message: 'Categoría no encontrada',
        });
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'Categoría actualizada correctamente',
        category: updatedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al actualizar la categoría',
        error: error.message,
      });
    }
  };
  
  const deleteCategory = async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  
      if (!deletedCategory) {
        return res.status(404).json({
          status: 'error',
          message: 'Categoría no encontrada',
        });
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'Categoría eliminada correctamente',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al eliminar la categoría',
        error: error.message,
      });
    }
  };
  

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
