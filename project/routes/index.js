const express = require('express');
const path = require('path');

const router = express.Router();
const indexController = require(path.join(__dirname, '../', 'controllers', 'indexController'));

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/signup', indexController.signup);

module.exports = router;
