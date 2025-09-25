const express = require('express');
const router = express.Router();
const {register,login,changePassword} = require('../controllers/auth-controllers');
const authmiddleware = require('../middleware/auth-middleware')

router.post('/register',register);
router.post('/login',login);
router.put('/update-password',authmiddleware,changePassword);

module.exports = router