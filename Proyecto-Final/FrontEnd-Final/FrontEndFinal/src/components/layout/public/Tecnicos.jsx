import React from "react";
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
} from "@mui/material";
const LeftColumn = () => {
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
          {["Desarrollo Web", "Diseño Gráfico", "Redacción", "Marketing"].map(
            (category, index) => (
              <ListItem button key={index}>
                <ListItemText primary={category} />
              </ListItem>
            )
          )}
        </List>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Habilidades
        </Typography>
        {["Jav Script", "React", "Photoshop", "SEO"].map((skill, index) => (
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

// Componente SearchSection
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

// Componente FreelancerList
const FreelancerList = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">Freelancer {index + 1}</Typography>
              <Typography variant="body2">
                Descripción breve del freelancer.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default function Tecnicos() {
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
