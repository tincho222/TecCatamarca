//importar dependencias

const connection = require("./database/connection");

const express = require("express");

const cors = require("cors");

console.log("API node arrancada");

//conexion a base de datos
connection();

//crear servidor de node
const app = express();

const puerto = 3900;

//configurar cors
app.use(cors());

//convertir daros del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  // Reemplaza con el origen de tu frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
//cargar conf rutas
const UserRuter = require("./routes/user");
const TechnicalRuter = require("./routes/technicalProfiles");
const RoleRuter = require("./routes/role");
const CategoriesRuter = require("./routes/categories");
const ServicesRuter = require("./routes/services");
const OrdersRuter = require("./routes/orders");
const ReviewsRuter=require("./routes/reviews"); 
const NotificationsRuter=require("./routes/notifications"); 

app.use("/api/user", UserRuter);
app.use("/api/technical", TechnicalRuter);
app.use("/api/role", RoleRuter);
app.use("/api/categories", CategoriesRuter);
app.use("/api/services", ServicesRuter);
app.use("/api/orders", OrdersRuter);
app.use("/api/reviews", ReviewsRuter);
app.use("/api/notifications", NotificationsRuter);
/*app.use("/api/follow", FollowRuter);  */
//poner servidor a escuchar peticiones http

app.listen(puerto, () => {
  console.log("servidor corriendo en el puero 3900");
});
