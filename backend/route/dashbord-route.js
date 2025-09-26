const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashbord-controllers');
const authmiddleware = require('../middleware/auth-middleware');

router.get('/all', authmiddleware, getDashboardSummary);

module.exports = router;
