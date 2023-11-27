const fs = require('fs/promises');
const { body } = require('express-validator');

module.exports = [
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
	}),
	body('name')
        .notEmpty().withMessage('Ingresa el nombre').bail()
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres'),
    body('price')
        .notEmpty().withMessage('Ingresa el precio').bail()
        .isNumeric().withMessage('Digita solo números'),
    body('discount')
        .notEmpty().withMessage('Ingrese el descuento. INGRESA 0 si NO tiene descuento').bail()
        .isNumeric().withMessage('Digita solo números'),
    body('descriptionTitle')
        .notEmpty().withMessage('Ingresa un título para la descripción'),
    body('description')
        .notEmpty().withMessage('Ingresa una descripción').bail()
        .isLength({ min: 20 }).withMessage('Debe tener al menos 20 caracteres'),
    body('stock')
        .notEmpty().withMessage('Ingresa el stock').bail()
        .isNumeric().withMessage('Digita solo números').bail()
        .custom(async (value, { req }) => {
            const stock = req.body.stock;
            if (stock == 0) {
              throw new Error('El stock no puede ser cero');
            }
            return true;
          }),
    body('specs')
          .notEmpty().withMessage('Ingresa una especificaciones').bail()
          .isLength({ min: 20 }).withMessage('Debe tener al menos 20 caracteres'),
    body('category')
          .notEmpty().withMessage('Escoge una categoría'),
    body('brand')
          .notEmpty().withMessage('Escoge una marca')
];
