const express = require('express');
const path = require('path');
const upload = require('../middlewares/multer');

const router = express.Router();
const productsController = require(path.join(__dirname, '../', 'controllers', 'productsController'));
const processtSingleImage = require('../middlewares/processSingleImage');
const productValidation = require('../middlewares/productValidation');

router.get('/', productsController.index); // Listado de productos
router.get('/create', productsController.create); // Formulario de creación de productos
router.get('/detail/:id', productsController.detail); // Detalle del producto según 'id'
router.get('/edit/:id', productsController.edit);

router.post('/', upload.single('image'), productValidation, productsController.store, processtSingleImage); // Cargar nuevo producto a la lista

router.put('/edit/:id', upload.single('image'), processtSingleImage, productsController.update);

router.delete('/delete/:id', productsController.delete);

module.exports = router;
