import React, { useState } from "react";

export const UseForm = (initialObj = {}) => {
  const [form, setForm] = useState(initialObj);

  const changed = ({ target }) => {
    let { name, value } = target;

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
    changed,
  };
};