const fs = require('fs/promises');
const { body } = require('express-validator');

module.exports = [
	body('email')
		.notEmpty().withMessage('Escribe un email').bail()
		.isEmail().withMessage('Escribe un formato de correo válido'),
	body('password')
		.notEmpty().withMessage('Escribe una contraseña').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula').bail()
		.matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula').bail()
		.matches(/\d/).withMessage('La contraseña debe contener al menos un número').bail()
		.matches(/[!@#$%^&*(),.?":{}|<>-_]/).withMessage('La contraseña debe contener al menos un carácter especial'),
	body('firstName')
		.notEmpty().withMessage('Escribe tu nombre').bail()
		.isLength({ min: 2 }).withMessage('Introduce al menos 2 caracteres'),
	body('lastName')
		.notEmpty().withMessage('Ecribe tu apellido').bail()
		.isLength({ min: 2 }).withMessage('Introduce al menos 2 caracteres'),
	body('dni')
		.notEmpty().withMessage('Escribe tu DNI').bail()
		.isNumeric().withMessage('Digita solo números'),
	body('phone')
		.notEmpty().withMessage('Escribe tu número de teléfono').bail()
		.isNumeric().withMessage('Digita solo números'),
	body('category')
		.notEmpty().withMessage('Escribe una categoría'),
	body('image').custom(async (value, { req }) => {
		if (req.file) {
			const allowedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
			const isImage = allowedImageTypes.includes(req.file.mimetype);
			if (!isImage) {
				await fs.unlink(req.file.path)
				throw new Error('Solo se permiten archivos de imagen');
			}
		} else {
			throw new Error('Debe subir una imagen')
		}
	})
];
