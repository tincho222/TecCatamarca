const mongoose = require('mongoose');

const connection = async()=>
{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/tec_catamarca");

        console.log("Connected correctamenter");
    } catch (error) {
        console.log(error);
        throw new Error("No se realizo la conexion a la base de datos");
    }
}

module.exports = connection