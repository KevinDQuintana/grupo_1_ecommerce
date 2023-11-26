const express = require('express');
const { body } = require('express-validator');

const path = require('path');
const upload = require('../middlewares/multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddlware = require('../middlewares/authMiddleware');

const router = express.Router();
const usersController = require(path.join(__dirname, '../', 'controllers', 'usersController'));
const processSingleImage = require('../middlewares/processSingleImage');
const validations = require('../middlewares/validations');
const loginValidation = require('../middlewares/loginValidation');

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', loginValidation, usersController.processLogin);

router.get('/logout', usersController.logOut)

router.get('/signup', guestMiddleware, usersController.signup);
router.post('/signup', upload.single('image'), validations, usersController.processSignup, processSingleImage);

module.exports = router;
