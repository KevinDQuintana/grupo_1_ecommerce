const express = require('express');
const path = require('path');

const router = express.Router();
const productDetailController = require(path.join(__dirname, '../', 'controllers', 'productDetailController'));

// router.get('/:id',productDetailController.id);
router.get('/',productDetailController.index);

module.exports = router;