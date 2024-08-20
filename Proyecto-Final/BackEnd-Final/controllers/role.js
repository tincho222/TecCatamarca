const Role = require("../models/role");

const createRole = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { id_roleNum, role_name } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!id_roleNum || !role_name) {
      return res
        .status(400)
        .json({ status: "error", message: "Faltan datos por enviar" });
    }

    // Crear el rol utilizando los datos proporcionados
    const newRole = new Role({
      id_roleNum,
      role_name,
    });

    // Guardar el rol en la base de datos
    const savedRole = await newRole.save();

    // Devolver una respuesta de éxito
    return res.status(201).json({
      status: "success",
      message: "Rol creado correctamente",
      role: savedRole,
    });
  } catch (error) {
    // Manejar errores
    return res.status(500).json({
      status: "error",
      message: "Error al crear rol",
      error: error.message,
    });
  }
};
const listRoles = async (req, res) => {
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

    // Consultar roles y contar el total
    const roles = await Role.find()
      .sort("_id")
      .skip(startIndex)
      .limit(itemPerPage);

    const totalRoles = await Role.countDocuments();

    // Devolver resultado
    return res.status(200).json({
      status: "success",
      page: page,
      itemPerPage: itemPerPage,
      total: totalRoles,
      roles: roles,
      totalPages: Math.ceil(totalRoles / itemPerPage),
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener la lista de roles",
      error: error.message,
    });
  }
};

module.exports = {
  listRoles,
};

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        status: "error",
        message: "Rol no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el rol",
      error: error.message,
    });
  }
};
const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { id_roleNum, role_name } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { id_roleNum, role_name },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({
        status: "error",
        message: "Rol no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Rol actualizado correctamente",
      role: updatedRole,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el rol",
      error: error.message,
    });
  }
};
const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return res.status(404).json({
        status: "error",
        message: "Rol no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Rol eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar el rol",
      error: error.message,
    });
  }
};

module.exports = {
  createRole,
  listRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
