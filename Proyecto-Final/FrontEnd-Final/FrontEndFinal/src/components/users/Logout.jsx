import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Limpia la autenticación y contadores
    localStorage.clear();
    setAuth({});
    // Redirige al usuario a la página de login después de cerrar sesión
    navigate("/");
  }, [5000]);

  return <h1>Cerrando sesion...</h1>;
};
