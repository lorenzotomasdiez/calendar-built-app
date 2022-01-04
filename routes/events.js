const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validateFields');
const {validateJwt} = require('../middlewares/validateJwt');


///////////////////////////////////////////////////////
// EVITAR PASAR MIDDLEWARE POR TODAS LAS FUNCIONES ////
///////////////////////////////////////////////////////
router.use(validateJwt)

//Obtener Eventos
router.get('/', getEvents)

//Crear Evento
router.post(
    '/',
    [
        check('title','Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es ogligatoria').custom(isDate),
        check('end', 'Fecha final es necesaria').custom(isDate),
        validateFields
    ], 
    createEvent
)

//Actualizar Evento
router.put(
    '/:id',
    [
        check('title','Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es ogligatoria').custom(isDate),
        check('end', 'Fecha final es necesaria').custom(isDate),
        validateFields
    ], 
    updateEvent)

//Eliminar Evento
router.delete('/:id', deleteEvent)

module.exports = router