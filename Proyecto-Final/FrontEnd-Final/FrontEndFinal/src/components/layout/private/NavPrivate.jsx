import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../../hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function NavPrivate() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isTechnical, setIsTechnical] = useState(false); // Estado para determinar si es técnico
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }; // Estado para determinar si la verificación está en proceso
  useEffect(() => {
    // Obtener el usuario del localStorage
    const user = localStorage.getItem("user");

    if (user) {
      // Parsear el JSON del usuario
      const userData = JSON.parse(user);

      // Obtener el campo role_name, que puede ser un array
      const roleName = userData.role_name;

      // Verificación para role_name si es un array y contiene "technical"
      if (Array.isArray(roleName) && roleName.includes("technical")) {
        setIsTechnical(true); // Si es técnico, cambia el estado a true
      } else {
        setIsTechnical(false); // Si no, establece el estado en false
      }

      // Verificación para el campo roles, si existe
      const roles = userData.roles;
      if (roles && Array.isArray(roles) && roles.includes("technical")) {
        setIsTechnical(true); // Si roles incluye "technical", cambia el estado a true
      } else if (!Array.isArray(roleName) || !roleName.includes("technical")) {
        setIsTechnical(false); // Si no cumple ninguna condición, establece el estado en false
      }

      console.log(userData);
    } else {
      // Si no hay usuario en el localStorage, establecer el estado en false
      setIsTechnical(false);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { auth } = useAuth();

  return (
    <Container sx={{ backgroundColor: "#111827", mb: 11 }} maxWidth="auto">
      <AppBar sx={{ backgroundColor: "#111827" }} position="fixed">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, p: 1 }}>
            <Box
              component="a"
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Link to="/">
                <img
                  src={"../src/assets/img/CatamarcaTec-Logos.png"}
                  alt="Logo"
                  style={{
                    height: "70px", // ajusta el tamaño según sea necesario
                    width: "auto",
                  }}
                />
              </Link>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link} to="/products" textAlign="center">
                  Blog
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link} to="/pricing" textAlign="center">
                  Pricing
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link} to="/blog" textAlign="center">
                  Blog
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                to="/"
                textAlign="center"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  position: "relative",
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "visible",
                    transform: "scaleX(1)",
                    transition: "all 0.1s ease-in-out",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "hidden",
                    transform: "scaleX(0)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              >
                Blog
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                to="/pricing"
                textAlign="center"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  position: "relative",
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "visible",
                    transform: "scaleX(1)",
                    transition: "all 0.1s ease-in-out",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "hidden",
                    transform: "scaleX(0)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              >
                Sobre Nosotros
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                to="/blog"
                textAlign="center"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  position: "relative",
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "visible",
                    transform: "scaleX(1)",
                    transition: "all 0.1s ease-in-out",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "hidden",
                    transform: "scaleX(0)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              >
                Servicios
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                to="/private/feedTecnicos"
                textAlign="center"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  position: "relative",
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "visible",
                    transform: "scaleX(1)",
                    transition: "all 0.1s ease-in-out",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "hidden",
                    transform: "scaleX(0)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              >
                
                Tecnicos
              </Typography>
            </MenuItem>

            {/* Botón para abrir el menú desplegable de Cuenta */}

            <Button
              onClick={handleMenuOpen}
              sx={{
                textTransform: "none",
                color: "inherit",
                textDecoration: "none",
                position: "relative",
                "&:hover::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "2px",
                  bottom: "-2px", //ajusta este valor para darle más espacio
                  left: "0",
                  backgroundColor: "currentColor",
                  visibility: "visible",
                  transform: "scaleX(1)",
                  transition: "all 0.1s ease-in-out",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "2px",
                  bottom: "-2px", //ajusta este valor para darle más espacio
                  left: "0",
                  backgroundColor: "currentColor",
                  visibility: "hidden",
                  transform: "scaleX(0)",
                  transition: "all 0.1s ease-in-out",
                },
              }}
            >
              <Avatar
                src={`http://localhost:3900/uploads/avatars/${auth.profile_image}`} // La URL de la imagen del perfil del usuario
                alt="Mi Cuenta"
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1,
                }}
              />
            </Button>

            {/* Menú desplegable */}
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "account-button",
              }}
            >
              {/* Menú condicional según el estado de isTechnical */}
              <MenuItem onClick={handleMenuClose}>
                <Typography
                  component={Link}
                  to={isTechnical ? "/private/editTec" : "/private/registerTec"}
                  textAlign="center"
                  sx={{
                    color: isTechnical ? "inherit" : "green",
                    textDecoration: "none",
                    position: "relative",
                    alignItems: "center", // Centra verticalmente el texto y el ícono
                    justifyContent: "center", // Centra horizontalmente el contenido
                    "&:hover::after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      bottom: "-2px",
                      left: "0",
                      backgroundColor: "currentColor",
                      visibility: "visible",
                      transform: "scaleX(1)",
                      transition: "all 0.1s ease-in-out",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      bottom: "-2px",
                      left: "0",
                      backgroundColor: "currentColor",
                      visibility: "hidden",
                      transform: "scaleX(0)",
                      transition: "all 0.1s ease-in-out",
                    },
                  }}
                >
                  
                  <ManageAccountsIcon sx={{ mr: 1 }} />{" "}
                  {isTechnical ? "Perfil tecnico" : "Crear perfil tecnico"}
                </Typography>
              </MenuItem>
              {/* Puedes agregar más opciones aquí */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="/private/editUsers"
                  textAlign="center"
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center", // Centra verticalmente el texto y el ícono
                    justifyContent: "center", // Centra horizontalmente el contenido
                    position: "relative",
                    "&:hover::after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      bottom: "-2px",
                      left: "0",
                      backgroundColor: "currentColor",
                      visibility: "visible",
                      transform: "scaleX(1)",
                      transition: "all 0.1s ease-in-out",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      bottom: "-2px",
                      left: "0",
                      backgroundColor: "currentColor",
                      visibility: "hidden",
                      transform: "scaleX(0)",
                      transition: "all 0.1s ease-in-out",
                    },
                  }}
                >
                  <AccountCircleIcon sx={{ mr: 1 }} />{" "}
                  {/* Icono con margen derecho */}
                  Perfil personal
                </Typography>
              </MenuItem>
            </Menu>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                to="/private/logout"
                textAlign="center"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  position: "relative",
                  display: "flex", // Hacemos que el contenedor sea flex
                  alignItems: "center", // Centra verticalmente
                  justifyContent: "center", // Centra horizontalmente
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // Ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "visible",
                    transform: "scaleX(1)",
                    transition: "all 0.1s ease-in-out",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px", // Ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "hidden",
                    transform: "scaleX(0)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              >
                Salir
                <LogoutIcon sx={{ marginLeft: 1 }} />{" "}
                {/* Icono de Logout con margen a la izquierda */}
              </Typography>
            </MenuItem>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default NavPrivate;
