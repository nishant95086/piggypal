const express = require('express');
const router = express.Router();
const { addIncome, updateIncome, deleteIncome, getAllIncome } = require('../controllers/income-controllers');
const authmiddleware = require('../middleware/auth-middleware');

router.post('/add-income', authmiddleware, addIncome);
router.get('/get-all-income', authmiddleware, getAllIncome);
router.delete('/delete-income/:id', authmiddleware, deleteIncome);
router.put('/update-income/:id', authmiddleware, updateIncome);

module.exports = router;
