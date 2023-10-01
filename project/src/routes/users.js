const express = require('express');
const path = require('path');

const router = express.Router();
const usersController = require(path.join(__dirname, '../', 'controllers', 'usersController'));

router.get('/login', usersController.login);

router.get('/signup', usersController.signup);

module.exports = router;