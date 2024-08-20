//importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//importar clave secreta
const libjwt = require("../services/jwt");
const secret = libjwt.secret;

//MIDDELWARE funcion de auteticacion
exports.auth = (req, res, next) => {
  //comprobar si llega la autenticacion
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "La peticion no tiene cabecera",
    });
  }
  //decodificar token
  let token = req.headers.authorization.replace(/[' "]+/g, "");

  try {
    let payload = jwt.decode(token, secret);
    console.log(payload);
    //comprobar expiracion token
    if (payload.exp <= moment().unix()) {
      return res
        .status(401)
        .send({ status: "error", message: "Token expirado" });
    }
    //agregar datos d e usuario a request
    req.user = payload;
  } catch (error) {
    return res
      .status(404)
      .send({ status: "error", message: "Token invalido", error });
  }

  //pasar a ejecucuin
  next();
};
