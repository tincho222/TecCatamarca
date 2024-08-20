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
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavPrivate() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
                  src={"src/assets/img/CatamarcaTec-Logos.png"}
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
                to="/private/tecnicos"
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
            <MenuItem onClick={handleCloseNavMenu}>
            <Typography
                component={Link}
                to="/Login"
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
                    bottom: "-2px",  //ajusta este valor para darle más espacio
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
                    bottom: "-2px",  //ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "hidden",
                    transform: "scaleX(0)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              > 
                Cerrar Sesion
              </Typography>
            </MenuItem>
          
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                to="/private/registerTec"
                textAlign="center"
                sx={{
                  color: "green",
                  mr: 5,
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
                    bottom: "-2px",  //ajusta este valor para darle más espacio
                    left: "0",
                    backgroundColor: "currentColor",
                    visibility: "hidden",
                    transform: "scaleX(0)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              >
                Quiero ser Tecnico  
              </Typography> 
            </MenuItem>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default NavPrivate;
