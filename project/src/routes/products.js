const express = require('express');
const path = require('path');
const upload = require('../middlewares/multer');

const router = express.Router();
const productsController = require(path.join(__dirname, '../', 'controllers', 'productsController'));

router.get('/', productsController.index); // Listado de productos

router.get('/create', productsController.create); // Formulario de creación de productos
router.post('/', upload.single('image'), productsController.store); // Cargar nuevo producto a la lista

router.get('/:id', productsController.detail); // Detalle del producto según 'id'

module.exports = router;
