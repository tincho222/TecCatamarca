import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

export const EditarTecnicos = () => {
  const { form, setForm, changed } = UseForm({
    profile_image: null, // Inicializa como null
  });
  const [saved, setSaved] = useState("not_sended"); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Obtener datos del usuario una vez al inicio.
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?.id || null;
  const tecnicoId = storedUser?.tecnicoPerfil || null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(Global.url + "categories/getCategories");
        const result = await response.json();
        if (response.ok) setCategories(result.categories);
        else console.error("Error al obtener categorías:", result);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };

    const fetchTechnicalProfile = async () => {
      try {
        if (!tecnicoId) {
          console.error("No se encontró el ID del perfil técnico.");
          return;
        }

        const response = await fetch(
          `${Global.url}technical/getTechnicalProfileById/${tecnicoId}`
        );
        const result = await response.json();

        if (response.ok) {
          const { profile_image, ...profileData } = result.profile;
          setForm(profileData); // No cargar `profile_image` en el formulario
          setSelectedCategory(result.profile.category_id || "");
        } else {
          console.error("Error al obtener el perfil técnico:", result);
        }
      } catch (error) {
        console.error("Error al cargar el perfil técnico:", error);
      }
    };

    fetchCategories();
    fetchTechnicalProfile();
  }, []); // Ejecuta una vez al montar el componente.

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profile_image: file });
  };

  const handleRatingChange = (e, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      console.error("No se encontró user_id o token en el localStorage.");
      setSaved("error");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("local_name", form.local_name);
    formData.append("bio", form.bio);
    formData.append("skills", form.skills);
    formData.append("rating", form.rating);
    formData.append("email_technical", form.email_technical);
    formData.append("num_technical", form.num_technical);
    formData.append("address", form.address);
    formData.append("category_id", selectedCategory);

    const coordinates = form.coordinates
      ? form.coordinates.split(",").map(Number)
      : [];
    const [longitude, latitude] = coordinates;

    if (longitude && latitude) {
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
    }

    // Solo agregar la imagen si se ha seleccionado una nueva
    if (form.profile_image) {
      formData.append("file0", form.profile_image);
    }

    try {
      const response = await fetch(
        `${Global.url}technical/updateTechnicalProfile/${tecnicoId}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setSaved("saved");
        navigate("/"); // Redirigir a la página principal.
      } else {
        console.error("Error en la respuesta:", result);
        setSaved("error");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil técnico:", error);
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Perfil Técnico
        </Typography>
      </header>
      <Box sx={{ mt: 3 }}>
        <form onSubmit={saveProfile}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {saved === "saved" && (
                <Alert severity="success">Perfil técnico actualizado!</Alert>
              )}
              {saved === "error" && (
                <Alert severity="error">Error al actualizar el perfil!</Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del Técnico"
                name="local_name"
                value={form.local_name || ""}
                onChange={changed}
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Biografía"
                name="bio"
                value={form.bio || ""}
                onChange={changed}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email_technical"
                value={form.email_technical || ""}
                onChange={changed}
                type="email"
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Contacto"
                name="num_technical"
                value={form.num_technical || ""}
                onChange={changed}
                type="text"
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                value={form.address || ""}
                onChange={changed}
                variant="outlined"
                required
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
              <Rating
                name="rating"
                value={parseFloat(form.rating) || 0}
                onChange={handleRatingChange}
                precision={0.5}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                  labelId="category-label"
                  name="category_id"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Categoría"
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Subir Imagen de Perfil
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Coordenadas de Ubicación (Longitud, Latitud)"
                name="coordinates"
                value={form.coordinates || ""}
                onChange={changed}
                placeholder="-74.005974, 40.712776"
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};
