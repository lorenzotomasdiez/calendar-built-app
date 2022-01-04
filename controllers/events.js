const {response} = require('express')
const Event = require("../models/Event")

const createEvent = async(req, res = response) => {

    const evento = new Event(req.body)
    try {
        evento.user = req.uid;
        const eventDb = await evento.save()
        res.json({
            ok: true,
            event: eventDb
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false , msg:"contactese con el admin"})
    }
}
    
const getEvents = async(req, res = response) => {
    const eventos = await Event.find().populate('user', 'name')
    res.json({
        ok:true,
        eventos
    })
}

const updateEvent = async(req, res = response) => {
    const eventId = req.params.id
    const uid = req.uid
    try {
        const event = await Event.findById(eventId)
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:"Event does not exist"
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"Dont have permission"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, nuevoEvento, {new:true})
        
        res.json({
            ok:true,
            event: eventUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Contacte al admin'
        })
    }
    
}

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById(eventId)
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:"Event does not exist"
            })
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"Dont have permission"
            })
        }

        await Event.findByIdAndDelete(eventId)
     
        res.status(200).json(
            {
                ok:true, 
                msg:"delete evento"
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Contacte al admin'
        })
    }
}

module.exports = {
    createEvent: createEvent,
    getEvents: getEvents,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
}