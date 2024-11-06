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
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export const RegisterTec = () => {
  const { form, changed } = UseForm({});
  const [saved, setSaved] = useState("not_sended");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar categorías desde el backend
    const fetchCategories = async () => {
      try {
        const response = await fetch(Global.url + "categories/getCategories");
        const result = await response.json();
        if (response.ok) {
          setCategories(result.categories); // Asumiendo que el resultado tiene un campo `categories`
        } else {
          console.error("Error al obtener categorías:", result);
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };

    fetchCategories();
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();

    // Obtener user_id y token del localStorage
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser).id : null;
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("No se encontró user_id o token en el localStorage.");
      setSaved("error");
      return;
    }

    // Crear el objeto FormData
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("local_name", form.local_name);
    formData.append("bio", form.bio);
    formData.append("skills", form.skills);
    formData.append("rating", form.rating);
    formData.append("email_technical", form.email_technical);
    formData.append("num_technical", form.num_technical);
    formData.append("address", form.address);
    formData.append("category_id", selectedCategory); // Añadir category_id

    // Crear el objeto location y añadirlo a FormData
    const coordinates = form.coordinates
      ? form.coordinates.split(",").map(Number)
      : [];
    const location = {
      type: "Point",
      coordinates: coordinates,
    };
    formData.append("location", JSON.stringify(location));

    // Añadir el nombre del archivo como profile_image
    if (form.profile_image && form.profile_image.name) {
      formData.append("profile_image", form.profile_image.name);
    }

    // Añadir el archivo como file0
    if (form.profile_image && form.profile_image) {
      formData.append("file0", form.profile_image);
    }

    try {
      const response = await fetch(Global.url + "technical/createTechnical", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      const result = await response.json();
  

      if (result.status === "success") {
        setSaved("saved");
        console.log("probando",result)
        const tecnicoPerfil = result.profileId
        // Actualizar el localStorage con el nuevo rol
        const updatedUser = {
          ...JSON.parse(storedUser),
          roles: ["technical"],
          tecnicoPerfil // Suponiendo que el rol técnico tiene este valor
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
        navigate("/"); 
      } else {
        console.error("Error en la respuesta:", result);
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
