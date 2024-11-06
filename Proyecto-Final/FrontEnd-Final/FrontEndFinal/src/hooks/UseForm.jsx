import React, { useState } from "react";

export const UseForm = (initialObj = {}) => {
  const [form, setForm] = useState(initialObj);

  const changed = ({ target }) => {
    let { name, value, type, files } = target;

    // Si es un campo de archivo, tomamos el primer archivo seleccionado
    if (type === "file") {
      value = files[0];
    }

    // Convertir ciertos campos a números si es necesario
    if (name === "id_roleNum") {
      value = parseInt(value, 10);
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    setForm,
    changed,
  };
};
