import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link,
  Container,
} from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import useAuth from "../../../hooks/useAuth";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  media: {
    width: "auto",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "auto",
    },
  },
}));

export const Maint = () => {
  const classes = useStyles();
  const classe = useStyles2();
  const bull = <span className={classes.bullet}>•</span>;
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const {auth}= useAuth();

  console.log(auth);

  return (
    <Box sx={{ backgroundColor: "#111827" }}>
      <Container maxWidth="xl">
        <Box>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ backgroundColor: "#111827" }}
                color="secondary.contrastText"
                p={2}
              >
                <h1>Hola {auth.first_name}</h1>
                <Typography variant="h3" align="center">
                  Transforma tus ideas en realidad, rápido y sin complicaciones,
                  con el técnico perfecto.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
              <Box
                sx={{ backgroundColor: "#111827" }}
                color="secondary.contrastText"
                p={2}
              >
                <Typography variant="h3" align="center">
                  Transforma tus ideas en realidad, rápido y sin complicaciones,
                  con el técnico perfecto.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Carousel responsive={responsive}>
            <div>
              <img src="image1.jpg" alt="Item 1" />
            </div>
            <div>
              <img src="image2.jpg" alt="Item 2" />
            </div>
            <div>
              <img src="image3.jpg" alt="Item 3" />
            </div>
            <div>
              <img src="image4.jpg" alt="Item 4" />
            </div>
            <div>
              <img src="image5.jpg" alt="Item 5" />
            </div>
          </Carousel>
        </Box>
        <Box>
          <Typography variant="h2" align="center">
            "Tec Catamarca: Soluciones Expertas para tu Celular y PC"
          </Typography>
          <Typography variant="h5" align="center">
            Simplifica tu vida y soluciona tus problemas tecnológicos sin
            complicaciones. ¡Hagámoslo realidad juntos!
          </Typography>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
                Column 1
              </Box>
            </Grid>
            <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
              <Box
                bgcolor="secondary.main"
                color="secondary.contrastText"
                p={2}
              >
                Column 2
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h1" align="center">
            TARJETAS
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className={`${classes.root} ${classes.card}`}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Typography variant="h3" align="center">
            PERSONAL
          </Typography>
          <Card className={classe.root}>
            <CardActionArea>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={`${classe.media} ${classe.mediaFullWidth}`}
                    image=""
                    title="Contemplative Reptile"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam sit amet tempor felis. Donec sit amet posuere diam.
                      In hac habitasse platea dictumst. Donec quis enim orci.
                      Sed aliquet eget lectus quis hendrerit. Phasellus lobortis
                      sapien a sollicitudin molestie. Nulla ut lacus porta,
                      fermentum metus eu, porta augue.
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Box>
        <Box>
          <Typography variant="h5" align="center">
            "Encuentra el profesional que necesitas"
          </Typography>
          <Typography align="center" variant="h6">
            "¿Listo para solucionar tus problemas tecnológicos con el técnico
            perfecto? Únete a nuestra comunidad hoy mismo y descubre un mundo de
            talento y soluciones a tu alcance."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
