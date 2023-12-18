const express = require('express');
const path = require('path');
const upload = require('../middlewares/multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddlware = require('../middlewares/authMiddleware');

const router = express.Router();
const productsController = require(path.join(__dirname, '../', 'controllers', 'productsController'));
const processSingleImage = require('../middlewares/processSingleImage');
const productValidation = require('../middlewares/productValidation');

router.get('/', productsController.index); // Listado de productos
router.get('/create', authMiddlware, productsController.create); // Formulario de creación de productos
router.get('/detail/:id', productsController.detail); // Detalle del producto según 'id'
router.get('/edit/:id', authMiddlware ,productsController.edit);

router.post('/', upload.single('image'), processSingleImage, productValidation, productsController.store); // Cargar nuevo producto a la lista

router.put('/edit/:id', upload.single('image'), processSingleImage, productValidation, productsController.update);

router.delete('/delete/:id', productsController.delete);

module.exports = router;
