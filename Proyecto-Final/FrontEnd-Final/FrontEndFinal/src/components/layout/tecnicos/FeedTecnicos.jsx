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

const LeftColumn = () => {
  const [categories, setCategories] = useState([]);

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
          {categories.map((category, index) => (
            <ListItem button key={index}>
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

const FreelancerList = () => {
  const [technicals, setTechnicals] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${Global.url}technical/getTechnicalProfiles`
        );
        const data = await response.json();
        setTechnicals(data.technicalProfiles);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Grid container spacing={3}>
      {technicals.map((technical, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={technical.profileImage || "/images/default-profile.png"}
              alt={technical.local_name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {technical.local_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {technical.bio}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Chip label={technical.category} />
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

export default function FeedTecnicos() {
  return (
    <Box sx={{ display: "flex", bgcolor: "#eaeaea", minHeight: "100vh" }}>
      <LeftColumn />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <SearchSection />
        <FreelancerList />
      </Box>
    </Box>
  );
}
