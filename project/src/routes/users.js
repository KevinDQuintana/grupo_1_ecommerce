const express = require('express');
const { body } = require('express-validator');

const path = require('path');
// const upload = require('../middlewares/multerUsers');
const upload = require('../middlewares/multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddlware = require('../middlewares/authMiddleware');

const router = express.Router();
const usersController = require(path.join(__dirname, '../', 'controllers', 'usersController'));

const validations = [
    body('email')
        .notEmpty().withMessage('Escribe un email').bail()
        .isEmail().withMessage('Escribe un formato de correo válido'),
    body('password')
        .notEmpty().withMessage('Escribe una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula').bail()
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula').bail()
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número').bail()
        .matches(/[!@#$%^&*(),.?":{}|<>-_]/).withMessage('La contraseña debe contener al menos un carácter especial'),
    body('firstName')
        .notEmpty().withMessage('Escribe tu nombre').bail()
        .isLength({min:2}).withMessage('Introduce al menos 2 caracteres'),
    body('lastName')
        .notEmpty().withMessage('Ecribe tu apellido').bail()
        .isLength({min:2}).withMessage('Introduce al menos 2 caracteres'),
    body('dni')
        .notEmpty().withMessage('Escribe tu DNI').bail()
        .isNumeric().withMessage('Digita solo números'),
    body('phone')
        .notEmpty().withMessage('Escribe tu número de teléfono').bail()
        .isNumeric().withMessage('Digita solo números'),
    body('category')
        .notEmpty().withMessage('Escribe una categoría'),
    body('image').custom(( value, { req } ) => {
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.png'];
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

const loginValidation = [
	body('email').notEmpty().withMessage('El email no puede estar vacio').bail().isEmail().withMessage('Escribe un formato de correo válido'),
	body('password').notEmpty().withMessage('La contraseña no puede estar vacia'),
]

const processSingleImage = require('../middlewares/processSingleImage');

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', loginValidation, usersController.processLogin);

router.get('/logout', usersController.logOut)

router.get('/signup', guestMiddleware, usersController.signup);
router.post('/signup', upload.single('image'), validations, usersController.processSignup, processSingleImage, );

module.exports = router;