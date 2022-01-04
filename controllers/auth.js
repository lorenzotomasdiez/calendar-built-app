const bcryptjs = require('bcryptjs')
const {response} = require('express')
const { generateJwt } = require('../helpers/jwt')
const User = require('../models/User')

const createUser = async (req, res = response) => {
    const {email, password} = req.body
    try {
        let user = await User.findOne({email: email})
        if(user){
            return res.status(400).json({
                ok:false,
                msg:'Usuario existente',
            })
        }

        user = new User(req.body)
        //encriptar contrasena
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)
        await user.save()

        //Generate JWT

        const token = await generateJwt(user.id, user.name)

    
        res.status(201).json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"contactese con el admin"
        })
    }

}

const loginUser = async (req, res = response) => {
    const {email, password} = req.body

    try {
        let user = await User.findOne({email: email})
        
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'Usuario inexistente',
            })
        }

        //confirmar passwords

        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }

        //Generar el JWT

        const token = await generateJwt(user.id, user.name)

        res.json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Por favor comuniquese con el admin'
        })
        
    }

}

const revalidToken = async (req, res = response) => {
    const {uid, name} = req

    const token = await generateJwt(uid, name)

    res.json({
        ok:true,
        msg:'revalidToken',
        uid: uid,
        name:name,
        token
    })
}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    revalidToken: revalidToken
}