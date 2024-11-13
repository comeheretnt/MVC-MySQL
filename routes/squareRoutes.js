const express = require('express');
const router = express.Router();
const squareController = require('../controllers/squareController');

// Route để hiển thị form
router.get('/', squareController.showForm);

// Route để tính chu vi và diện tích hình vuông
router.post('/calculate', squareController.calculateSquare);

module.exports = router;
