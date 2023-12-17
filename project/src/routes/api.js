const express = require('express');
const path = require('path');

const router = express.Router();
const apiController = require(path.join(__dirname, '../', 'controllers', 'apiController'));

router.get('/products/:id', apiController.singleProduct);
router.get('/products', apiController.listOfProducts);

router.get('/users/:id', apiController.singleUser);
router.get('/users', apiController.listOfUsers);

module.exports = router;
