const mongoose = require('mongoose');
require('dotenv').config();
const env = process.env
const dbConnection = async () => {
    try {
        await mongoose.connect(env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('DB Online')
    }catch(e){
        console.log(e);
        throw new Error('Error al momento de inicializar base de datos.')
    }
}

module.exports = {
    dbConnection
}