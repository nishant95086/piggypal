const express = require('express');
const router = express.Router();
const { addInvestment, getAllInvestment, updateInvestment, deleteInvestment } = require('../controllers/investment-controllers');
const authmiddleware = require('../middleware/auth-middleware');

router.post('/add-investment', authmiddleware, addInvestment);
router.get('/get-all-investment', authmiddleware, getAllInvestment);
router.delete('/delete-investment/:id', authmiddleware, deleteInvestment);
router.put('/update-investment/:id', authmiddleware, updateInvestment);

module.exports = router;
