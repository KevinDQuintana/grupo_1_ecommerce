const express = require('express');
const router = express.Router();
const productDetailController = require('../controllers/productDetailController');

router.get('/:id',productDetailController.id);

module.exports = router;