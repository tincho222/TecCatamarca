import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import { UseForm } from "../../hooks/UseForm";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export const Login = () => {
  const { form, changed } = UseForm({});
  const { setAuth } = useAuth();
  const navigate = useNavigate(); // Inicializar useNavigate
  // Estados para manejar los mensajes de error y éxito
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    try {
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        body: JSON.stringify(userToLogin),
        headers: { "content-type": "application/json" },
      });
      const data = await request.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setAuth(data.user);
        setSuccessMessage("¡Ingreso exitoso! Redirigiendo...");
        setErrorMessage(""); // Limpiamos cualquier mensaje de error previo

        // Redireccionar después de un pequeño retraso
        setTimeout(() => {
          navigate("/"); // Cambia a la página principal
          window.location.reload();
        }, 1000);
      } else {
        setErrorMessage("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        setSuccessMessage(""); // Limpiamos cualquier mensaje de éxito previo
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error al intentar iniciar sesión. Inténtalo más tarde.");
      setSuccessMessage(""); // Limpiamos cualquier mensaje de éxito previo
    }
  };

  return (
    <Box
      component="form"
      onSubmit={loginUser}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "300px" },
        "& .MuiButton-root": { m: 1, width: "300px" },
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Iniciar Sesión
      </Typography>

      {/* Mensaje de éxito */}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      {/* Mensaje de error */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        onChange={changed}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        onChange={changed}
        required
      />
      <input type="submit" value="Ingresar" className="btn btn-success" />
    </Box>
  );
};
