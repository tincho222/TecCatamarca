// Importar dependencias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

console.log("API Node arrancada");

// Conexión a base de datos
connection();

// Crear servidor de Node
const app = express();
const puerto = 3900;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Cambia esto según tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Habilitar CORS con las opciones correctas
app.use(cors(corsOptions));

// Middleware para responder a preflight requests (OPTIONS)
app.options('*', cors(corsOptions));

// Convertir datos del body a objetos JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Cargar rutas
const UserRuter = require("./routes/user");
const TechnicalRuter = require("./routes/technicalProfiles");
const RoleRuter = require("./routes/role");
const CategoriesRuter = require("./routes/categories");
const ServicesRuter = require("./routes/services");
const OrdersRuter = require("./routes/orders");
const ReviewsRuter = require("./routes/reviews");
const NotificationsRuter = require("./routes/notifications");

app.use("/api/user", UserRuter);
app.use("/api/technical", TechnicalRuter);
app.use("/api/role", RoleRuter);
app.use("/api/categories", CategoriesRuter);
app.use("/api/services", ServicesRuter);
app.use("/api/orders", OrdersRuter);
app.use("/api/reviews", ReviewsRuter);
app.use("/api/notifications", NotificationsRuter);

// Poner servidor a escuchar peticiones HTTP
app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
