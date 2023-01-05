require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.MONGOATLAS;

const conexion = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', () =>{
    console.log(`conexion ala database correcta - URL: ${URL}` );
});

mongoose.connection.on('error', () =>{
    console.log(`conexion ala database NO encontrada - URL: ${URL}` );
});

module.exports = conexion; 