const express = require('express');
const path = require('path');

const router = express.Router();
const productOptionsController = require(path.join(__dirname, '../', 'controllers', 'productOptionsController'));

// router.get('/',productOptionsController.index);
router.get('/add',productOptionsController.add);
router.get('/edit',productOptionsController.edit);

module.exports = router;