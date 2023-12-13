const express = require('express');
const path = require('path');

const router = express.Router();
const apiController = require(path.join(__dirname, '../', 'controllers', 'apiController'));

router.get('/products/:id', apiController.singleProduct);
router.get('/products', apiController.listOfProducts);

module.exports = router;
