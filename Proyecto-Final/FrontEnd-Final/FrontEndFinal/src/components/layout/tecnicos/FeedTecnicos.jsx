import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  Checkbox,
  CardMedia,
  Chip,
} from "@mui/material";
import { Global } from "../../../helpers/Global";

// Componente de la columna izquierda para filtros
const LeftColumn = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${Global.url}categories/getCategories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category); // Notifica al componente padre sobre la selección
  };

  return (
    <Box sx={{ width: 250, p: 2, bgcolor: "#f5f5f5", height: "100vh" }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>
      <Divider />
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Categorías
        </Typography>
        <List>
          <ListItem
            button
            key="todos"
            selected={selectedCategory === "Todos"}
            onClick={() => handleCategoryClick("Todos")}
          >
            <ListItemText primary="Todos" />
          </ListItem>
          {categories.map((category, index) => (
            <ListItem
              button
              key={index}
              selected={category.name === selectedCategory}
              onClick={() => handleCategoryClick(category.name)}
            >
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Habilidades
        </Typography>
        {["JavaScript", "React", "Photoshop", "SEO"].map((skill, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox name={skill} />}
            label={skill}
          />
        ))}
      </Box>
    </Box>
  );
};

// Componente de la sección de búsqueda
const SearchSection = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Buscar freelancers"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary">
        Buscar
      </Button>
    </Box>
  );
};

// Componente para listar los perfiles técnicos
const FreelancerList = ({ selectedCategory }) => {
  const [technicals, setTechnicals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener perfiles técnicos
    const fetchTechnicals = async () => {
      try {
        const response = await fetch(
          `${Global.url}technical/getTechnicalProfiles`
        );
        const data = await response.json();
        setTechnicals(data.technicalProfiles);
      } catch (error) {
        console.error("Error fetching technical profiles:", error);
      }
    };

    // Obtener categorías
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${Global.url}categories/getCategories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchTechnicals();
    fetchCategories();
  }, []);

  // Mapear IDs de categorías a nombres
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "Sin categoría";
  };

  // Filtrar perfiles técnicos por categoría seleccionada
  const filteredTechnicals = selectedCategory && selectedCategory !== "Todos"
    ? technicals.filter((technical) => getCategoryName(technical.category_id) === selectedCategory)
    : technicals;

  return (
    <Grid container spacing={3}>
      {filteredTechnicals.map((technical, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={technical.profile_image || "/images/default-profile.png"}
              alt={technical.local_name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {technical.local_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {technical.bio}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {getCategoryName(technical.category_id)} {/* Mostrar nombre de la categoría */}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Chip label={getCategoryName(technical.category_id)} /> {/* Mostrar nombre de la categoría */}
                <Typography variant="subtitle1" color="primary">
                  {`$${technical.price}`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Componente principal de FeedTecnicos
export default function FeedTecnicos() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Box sx={{ display: "flex", bgcolor: "#eaeaea", minHeight: "100vh" }}>
      <LeftColumn onCategorySelect={setSelectedCategory} />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <SearchSection />
        <FreelancerList selectedCategory={selectedCategory} />
      </Box>
    </Box>
  );
}
