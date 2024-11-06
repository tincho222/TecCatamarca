import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { UseForm } from "../../hooks/UseForm";
import { Global } from "../../helpers/Global";

export const EditarUsers = ({ userId }) => {
  const { form, changed, setForm } = UseForm({});
  const [saved, setSaved] = useState("not_sended");
  const [previewImage, setPreviewImage] = useState(null);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser?.id || null;

      try {
        const response = await fetch(`${Global.url}user/profile/${userId}`);
        const data = await response.json();
        if (data.status === "success") {
          setForm(data.user);
          setPreviewImage(`http://localhost:3900/uploads/avatars/${data.user.profile_image}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId, setForm]);

  const updateUser = async (e) => {
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
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser?.id || null;
      const response = await fetch(`${Global.url}user/update/${userId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        setSaved("saved");
        window.location.reload();
      } else {
        setSaved("error");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setSaved("error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      changed({ target: { name: "profile_image", value: file.name } });
    }
  };

  const handlePasswordChange = async () => {
    // Lógica para actualizar la contraseña
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = storedUser?.id || null;

    try {
      const response = await fetch(`${Global.url}user/change-password/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setSaved("password_changed");
        setOpenPasswordModal(false);
      } else {
        setSaved("password_error");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setSaved("password_error");
    }
  };

  return (
    <Box sx={{ mt: 3, mx: "auto", maxWidth: 600, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Usuario
      </Typography>
      <Box>
        <Avatar
          src={previewImage || `http://localhost:3900/uploads/avatars/${form.profile_image}`}
          alt="User Profile Image"
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        />
        <Button variant="contained" component="label" fullWidth>
          Cambiar imagen
          <input type="file" hidden id="file0" onChange={handleImageChange} />
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        {saved === "saved" && (
          <Alert severity="success">Usuario actualizado correctamente!</Alert>
        )}
        {saved === "error" && (
          <Alert severity="error">Error al actualizar usuario</Alert>
        )}
        {saved === "password_changed" && (
          <Alert severity="success">Contraseña cambiada exitosamente!</Alert>
        )}
        {saved === "password_error" && (
          <Alert severity="error">Error al cambiar la contraseña</Alert>
        )}
        <form onSubmit={updateUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="first_name"
                value={form.first_name || ""}
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="last_name"
                value={form.last_name || ""}
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email || ""}
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
                value={form.nick || ""}
                onChange={changed}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Teléfono"
                name="num_user"
                value={form.num_user || ""}
                onChange={changed}
                type="number"
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
                Guardar cambios
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => setOpenPasswordModal(true)}
              >
                Cambiar contraseña
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Modal para cambiar contraseña */}
      <Dialog open={openPasswordModal} onClose={() => setOpenPasswordModal(false)}>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa tu nueva contraseña para actualizarla.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nueva Contraseña"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordModal(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePasswordChange} color="primary">
            Cambiar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
