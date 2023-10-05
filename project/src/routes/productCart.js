const express = require('express');
const path = require('path');

const router = express.Router();
const productCartController = require(path.join(__dirname, '../', 'controllers', 'productCartController'));
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, productCartController.index);

module.exports = router;