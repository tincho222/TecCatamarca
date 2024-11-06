import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import { UseForm } from "../../hooks/UseForm";
import { Global } from "../../helpers/Global";

export const Register = () => {
  const { form, changed } = UseForm({});
  const [saved, setSaved] = useState("not_sended");

  const saveUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    const fileInput = document.querySelector("#file0");
    if (fileInput.files.length > 0) {
      formData.append("file0", fileInput.files[0]);
    }

    try {
      const response = await fetch(Global.url + "user/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        setSaved("saved");
      } else {
        setSaved("error");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <Typography variant="h4" component="h1" gutterBottom>
          Registro
        </Typography>
      </header>
      <Box sx={{ mt: 3 }}>
        <form onSubmit={saveUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {saved === "saved" && (
                <Alert severity="success">Usuario registrado!!</Alert>
              )}
              {saved === "error" && (
                <Alert severity="error">Usuario No registrado!!</Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={changed}
                type="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nick"
                name="nick"
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                onChange={changed}
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Teléfono"
                name="num_user"
                onChange={changed}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                fullWidth
                label="Roles"
                name="id_roleNum"
                onChange={changed}
                type="number"
                variant="outlined"
              /> */}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Subir imagen
                <input
                  type="file"
                  hidden
                  id="file0"
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                ¡Regístrate!
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};