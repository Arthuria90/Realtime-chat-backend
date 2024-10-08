/*
    path: api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Create user
router.post('/new',[
    check('name','Name is mandatory').not().isEmpty(),
    check('email', 'Email must be a valid email').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(), 
    validateFields
], createUser);

// Login user
router.post('/',[
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Email must be a valid email').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(), 
    validateFields
], loginUser);

// Renew token
router.get('/renew', validateJWT, renewToken);

module.exports = router;
