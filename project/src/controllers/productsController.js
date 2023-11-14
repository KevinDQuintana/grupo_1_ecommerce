const fs = require('fs/promises');
const path = require('path');
const { title } = require('process');
const productsFilePath = path.join(__dirname, '../', 'data', 'productsDataBase.json');

const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: function (req, res) {
		db.Products.findAll({ include: { association: 'images' } })
			.then(products => {
				return res.render(path.join(__dirname, '../', 'views', 'products', 'products'), { styles: ['/css/index.css', '/css/products.css'], products, toThousand });
			});
	},
	create: function (req, res) {
		db.Products_categories.findAll()
			.then(productsCategories => {
				db.Brands.findAll()
					.then(productsBrands => {
						db.Colors.findAll()
							.then(productsColors => {
								return res.render(path.join(__dirname, '../', 'views', 'products', 'createProduct'), { styles: ['/css/index.css', '/css/productCreate.css'], productsCategories, productsBrands, productsColors });
							})
					})
			})
	},
	detail: function (req, res) {
		db.Products.findOne({
			where: {
				product_id: req.params.id
			},
			include: { association: 'images' }
		}).then(product => {
			return res.render(path.join(__dirname, '../', 'views', 'products', 'productDetail'), { styles: ['/css/index.css', '/css/productDetail.css'], product, toThousand });
		})
	},
	edit: function (req, res) {
		const promCategories = db.Products_categories.findAll();
		const promBrands = db.Brands.findAll();
		const promColors = db.Colors.findAll();

		Promise.all([promCategories, promBrands, promColors])
			.then(results => {
				db.Products.findByPk(req.params.id).then(product => {
					return res.render(path.join(__dirname, '../', 'views', 'products', 'editProduct'), { styles: ['/css/index.css', '/css/productCreate.css', '/css/editProduct.css'], product, productsCategories: results[0], productsBrands: results[1], productsColors: results[2] });
				})
			})
	},
	store: function (req, res) {
		console.log('POST Request - NEW PRODUCT');
		console.log(`[INFO] filename: ${req.file.filename}`);
		db.Products.create({
			name: req.body.name,
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			description_title: req.body.descriptionTitle,
			description: req.body.description,
			stock: Number(req.body.stock),
			category_id: Number(req.body.category),
			brand_id: Number(req.body.brand),
			specs: req.body.specs
		})
			.then((product) => {
				console.log('[INFO] new product created successfully');
				db.Images.create({
					product_id: product.product_id,
					location: req.file.filename
				}).then(() => {
					console.log('[INFO] new image created successfully');
					res.redirect('/products');
				})
			})
			.catch(err => {
				console.log(`[ERROR] can\'t create product: ${err}`);
				return res.redirect('/products/create');
			})
	},
	update: function (req, res) {
		const promImage = db.Images.update(
			{
				location: req.file.filename
			},
			{
				where: {
					product_id: req.params.id
				}
			}
		)
		const promProductUpdate = db.Products.update(
			{
				name: req.body.name,
				price: Number(req.body.price),
				discount: Number(req.body.discount),
				description_title: req.body.descriptionTitle,
				description: req.body.description,
				stock: Number(req.body.stock),
				category_id: 1,
				brand_id: 1,
				specs: req.body.specs
			},
			{
				where: {
					product_id: req.params.id
				}
			}
		)
		Promise.all([promImage, promProductUpdate])
			.then(() => {
				console.log('[INFO] product updated successfully');
				return res.redirect(`/products/detail/${req.params.id}`);
			})
			.catch(err => console.log(`[ERROR] can\'t update product: ${err}`))
	},
	delete: function (req, res) {
		console.log('DELETE Request');
		db.Images.findOne({
			where: {
				product_id: req.params.id
			}
		})
			.then((image) => {
				const pathRemoveFile = path.join(__dirname, '../', '../', 'uploads', 'products', image.location);
				fs.unlink(pathRemoveFile)
				console.log('[INFO] image file removed successfully');
				db.Images.destroy({
					where: {
						product_id: req.params.id
					}
				})
					.then(() => {
						console.log('[INFO] image entry deleted successfully');
						db.Products.destroy({
							where: {
								product_id: req.params.id
							}
						})
							.then(() => {
								console.log('[INFO] product entry deleted successfully');
								res.redirect('/products')
							})
							.catch(err => {
								console.log(`[ERROR] can\'t delete product entry from table: ${err}`);
							})
					})
					.catch(err => {
						console.log(`[ERROR] can\'t delete image entry from table: ${err}`);
					})
			})
			.catch(err => {
				console.log(`[ERROR] can\'t remove image file: ${err}`);
			})
	}
};

module.exports = controller;
