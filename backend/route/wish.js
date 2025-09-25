const express = require('express');
const router = express.Router();
const {addWish,getAllWish,deleteWish,updateWish} = require('../controllers/wish-list-controllers')
const authmiddleware = require('../middleware/auth-middleware');

router.post('/add-wish',authmiddleware,addWish)
router.get('/get-all-wish',authmiddleware,getAllWish)
router.delete('/delete-wish/:id',authmiddleware,deleteWish)
router.put('/update-wish/:id',authmiddleware,updateWish)

module.exports = router