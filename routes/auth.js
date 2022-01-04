const {Router} = require('express');
const router = Router()
const {createUser, loginUser, revalidToken} = require('../controllers/auth')

const {check} = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const {validateJwt} = require('../middlewares/validateJwt');

//Create User
router.post(
    '/new',
    [ //middleware
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at leas 6 characters').isLength({min:6}),
        validateFields
    ],
    createUser
)

//Login User
router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at leas 6 characters').isLength({min:6}),
        validateFields
    ],
    loginUser
)

//Revalid Token
router.get(
    '/renew',
    validateJwt, 
    revalidToken
)

module.exports = router