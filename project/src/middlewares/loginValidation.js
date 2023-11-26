const { body } = require('express-validator');

module.exports = [
	body('email')
		.notEmpty().withMessage('El email no puede estar vacio').bail()
		.isEmail().withMessage('Escribe un formato de correo válido'),
	body('password')
		.notEmpty().withMessage('La contraseña no puede estar vacia'),
];
