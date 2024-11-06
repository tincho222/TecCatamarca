import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Container,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 0),
}));

const FooterLogo = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: "block",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));
export default function Footer() {
  return (
    <FooterContainer sx={{ backgroundColor: "#2b3442" }} component="footer">
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={3}>
            <FooterLogo>
              <img
                style={{ height: "70px", width: "auto" }}
                src="../src/assets/img/logo-footer.png"
                alt="LOGO FOOTER"
              />
            </FooterLogo>
            <Typography
              variant="subtitle1"
              sx={{ color: "white" }}
              color="textSecondary"
            >
              Soluciones Expertas para tu Celular y PC
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                textDecoration: "underline",
                textDecorationColor: "white",
                textDecorationThickness: "2px",
                textUnderlineOffset: "5px",
              }}
              gutterBottom
            >
              Enlaces
            </Typography>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
                Enlaces
              </Typography>
            </FooterLink>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
            </FooterLink>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
                Contacto
              </Typography>
            </FooterLink>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
                Acerca de
              </Typography>
            </FooterLink>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                textDecoration: "underline",
                textDecorationColor: "white", // Color del subrayado
                textDecorationThickness: "2px", // Grosor del subrayado
                textUnderlineOffset: "5px",
              }}
              gutterBottom
            >
              Recursos
            </Typography>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
            </FooterLink>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
                Preguntas Frecuentes
              </Typography>
            </FooterLink>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
                Ayuda
              </Typography>
            </FooterLink>
            <FooterLink
              href="#"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              <Typography
                component={Link}
                to="/login"
                variant="subtitle1"
                textAlign="center"
                sx={{
                  color: "white",
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
                Termino y condiciones
              </Typography>
            </FooterLink>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                textDecoration: "underline",
                textDecorationColor: "white", // Color del subrayado
                textDecorationThickness: "2px", // Grosor del subrayado
                textUnderlineOffset: "5px",
              }}
              gutterBottom
            >
              Nuestras Redes
            </Typography>
            <FooterLink>
              <IconButton
                aria-label="Facebook"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <FacebookIcon fontSize="large" />{" "}
                {/* Tamaño predefinido grande */}
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <InstagramIcon fontSize="large" />{" "}
                {/* Tamaño predefinido grande */}
              </IconButton>
              <IconButton
                aria-label="whatsapp"
                href="https://www.https://www.whatsapp.com/.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <WhatsAppIcon fontSize="large" />{" "}
                {/* Tamaño predefinido grande */}
              </IconButton>
            </FooterLink>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography
            variant="body2"
            sx={{ color: "white" }}
            color="textSecondary"
            align="center"
          >
            {"© "}
            {new Date().getFullYear()} Tec Catamarca. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}
