//importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//clave secreta
const secret = "Clave_secreta_del_proyecto";

//crear funcion para token
const createToken = (user) => {
  const payload = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    nick: user.nick,
    email: user.email,
    role: user.role,
    profile_image: user.profile_image,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, secret);
};
//devolver jwt token codificado

module.exports = 
{
    secret: secret,
    createToken: createToken,
    
}