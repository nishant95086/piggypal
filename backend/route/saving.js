const express = require('express');
const router = express.Router();
const { addSaving, getAllSaving, updateSaving, deleteSaving } = require('../controllers/saving-controllers');
const authmiddleware = require('../middleware/auth-middleware');

router.post('/add-saving', authmiddleware, addSaving);
router.get('/get-all-saving', authmiddleware, getAllSaving);
router.delete('/delete-saving/:id', authmiddleware, deleteSaving);
router.put('/update-saving/:id', authmiddleware, updateSaving);

module.exports = router;
