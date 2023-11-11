const express = require('express');
const path = require('path');

const router = express.Router();
const indexController = require(path.join(__dirname, '../', 'controllers', 'indexController'));

router.get('/', indexController.index);
router.get('/images/:filename', indexController.productImage);

module.exports = router;
