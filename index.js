const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();
const env = process.env
//Crear servidor
const app = express();

//Data Base
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'))

//TODO: crud eventos
app.use('/api/events', require('./routes/events'))

//Escuchar peticiones
app.listen(env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${env.PORT}`)
})