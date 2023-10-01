const express = require('express');
const path = require('path');
const upload = require('../middlewares/multerUsers');
const { body } = require('express-validator');

const router = express.Router();
const usersController = require(path.join(__dirname, '../', 'controllers', 'usersController'));
const validations = [
    body('email')
        .notEmpty().withMessage('Escribe un email').bail()
        .isEmail().withMessage('Escribe un formato de correo válido'),
    body('password').notEmpty().withMessage('Escribe una contraseña'),
    body('firstName').notEmpty().withMessage('Escribe tu nombre'),
    body('lastName').notEmpty().withMessage('Ecribe tu apellido'),
    body('dni').notEmpty().withMessage('Escribe tu DNI').bail()
        .isNumeric().withMessage('Digita solo números'),
    body('phone').notEmpty().withMessage('Escribe tu número de teléfono').bail()
        .isNumeric().withMessage('Digita solo números'),
    body('category').notEmpty().withMessage('Escribe una categoría'),
    body('image').custom(( value, { req } ) => {
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            const fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Solo se permite: ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

router.get('/signup', usersController.signup);
router.post('/signup', upload.single('image'), validations ,usersController.processSignup);

module.exports = router;