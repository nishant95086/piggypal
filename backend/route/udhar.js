const express = require('express');
const router = express.Router();
const {addUdhar,updateUdhar,deleteUdhar,getAllUdhar} = require('../controllers/udhar-controllers')
const authmiddleware = require('../middleware/auth-middleware');

router.post('/add-udhar',authmiddleware,addUdhar)
router.get('/get-all-udhar',authmiddleware,getAllUdhar)
router.delete('/delete-udhar/:id',authmiddleware,deleteUdhar)
router.put('/update-udhar/:id',authmiddleware,updateUdhar)

module.exports = router