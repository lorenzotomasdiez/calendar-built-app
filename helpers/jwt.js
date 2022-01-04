const jwt = require("jsonwebtoken");
require("dotenv").config()

const env = process.env

const generateJwt = (uid, name) => {
    
    return new Promise((resolve, reject) => {
        const payload = {uid, name}
        jwt.sign(payload, env.SECRET_JWT_SEED, {
            expiresIn:'2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token'); 
            }
            resolve(token)
        })
    })
}

module.exports = {
    generateJwt: generateJwt
}