import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Rating,
} from "@mui/material";
import { UseForm } from "../../../hooks/UseForm";
import { Global } from "../../../helpers/Global";

export const RegisterTec = () => {
  const { form, changed } = UseForm({});
  const [saved, setSaved] = useState("not_sended");


  const saveProfile = async (e) => {
    e.preventDefault();

    // Crear el objeto location
    const coordinates = form.coordinates
      ? form.coordinates.split(",").map(Number)
      : [];
    const location = {
      type: "Point",
      coordinates: coordinates,
    };

    const formData = new FormData();
    formData.append("user_id", userId); // Añadir user_id al FormData
    formData.append("local_name", form.local_name);
    formData.append("bio", form.bio);
    formData.append("skills", JSON.stringify(form.skills)); // Convertir skills a JSON
    formData.append("rating", form.rating);
    formData.append("email_technical", form.email_technical);
    formData.append("num_technical", form.num_technical);
    formData.append("address", form.address);
    formData.append("location", JSON.stringify(location)); // Añadir location como JSON

    const fileInput = document.querySelector("#file0");
    if (fileInput.files[0]) {
      formData.append("profile_image", fileInput.files[0]);
    }

    try {
      const response = await fetch(Global.url + "technical/createTechnical", {
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
      console.error("Error al registrar el perfil técnico:", error);
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <Typography variant="h4" component="h1" gutterBottom>
          Registrar Perfil Técnico
        </Typography>
      </header>
      <Box sx={{ mt: 3 }}>
        <form onSubmit={saveProfile}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {saved === "saved" && (
                <Alert severity="success">Perfil técnico registrado!!</Alert>
              )}
              {saved === "error" && (
                <Alert severity="error">Error al registrar el perfil!!</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del Técnico"
                name="local_name"
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Biografía"
                name="bio"
                onChange={changed}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email_technical"
                onChange={changed}
                type="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Contacto"
                name="num_technical"
                onChange={changed}
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="skills-label">Habilidades</InputLabel>
                <Select
                  labelId="skills-label"
                  name="skills"
                  multiple
                  value={form.skills || []}
                  onChange={changed}
                  renderValue={(selected) => selected.join(", ")}
                  label="Habilidades"
                >
                  <MenuItem value="repair">Reparación</MenuItem>
                  <MenuItem value="installation">Instalación</MenuItem>
                  <MenuItem value="maintenance">Mantenimiento</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="rating-label">Calificación</InputLabel>
                <Rating
                  name="rating"
                  value={parseFloat(form.rating) || 0}
                  onChange={changed}
                  precision={0.5}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Subir Imagen de Perfil
                <input
                  type="file"
                  hidden
                  name="profile_image"
                  id="file0"
                  onChange={changed}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Coordenadas de Ubicación (Longitud, Latitud)"
                name="coordinates"
                onChange={changed}
                placeholder="-74.005974, 40.712776"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Registrar Perfil Técnico
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};
