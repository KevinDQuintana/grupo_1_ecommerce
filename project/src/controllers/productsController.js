const fs = require('fs/promises');
const path = require('path');

const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// index: function (req, res) {
	// 	db.Products.findAll({ include: { association: 'images' } })
	// 		.then(products => {
	// 			return res.render(path.join(__dirname, '../', 'views', 'products', 'products'), { styles: ['/css/index.css', '/css/products.css'], products, toThousand });
	// 		});
	// },
	index: async function (req, res) {
		try {
			const products = await db.Products.findAll({ include: { association: 'images' } });
			const viewPath = path.join(__dirname, '../', 'views', 'products', 'products');
			const locals = {
				styles: ['/css/index.css', '/css/products.css'],
				products,
				toThousand
			};
			return res.render(viewPath, locals);
		} catch (error) {
			console.log(`[ERROR] ${error}`);
		}
	},
	// create: function (req, res) {
	// 	db.Products_Categories.findAll()
	// 		.then(productsCategories => {
	// 			db.Brands.findAll()
	// 				.then(productsBrands => {
	// 					db.Colors.findAll()
	// 						.then(productsColors => {
	// 							return res.render(path.join(__dirname, '../', 'views', 'products', 'createProduct'), { styles: ['/css/index.css', '/css/productCreate.css'], productsCategories, productsBrands, productsColors });
	// 						})
	// 				})
	// 		})
	// },
	create: async function (req, res) {
		try {
			const productCategories = await db.Products_Categories.findAll();
			const productBrands = await db.Brands.findAll();
			const productColors = await db.Colors.findAll();
			const viewPath = path.join(__dirname, '../', 'views', 'products', 'createProduct')
			const locals = {
				styles: ['/css/index.css', '/css/productCreate.css'],
				productCategories,
				productBrands,
				productColors
			}
			return res.render(viewPath, locals);
		} catch (error) {
			console.log(`[ERROR] ${error}`);
		}
	},
	// detail: function (req, res) {
	// 	db.Products.findOne({
	// 		where: {
	// 			product_id: req.params.id
	// 		},
	// 		include: { association: 'images' }
	// 	}).then(product => {
	// 		return res.render(path.join(__dirname, '../', 'views', 'products', 'productDetail'), { styles: ['/css/index.css', '/css/productDetail.css'], product, toThousand });
	// 	})
	// },
	detail: async function (req, res) {
		try {
			const product_id = req.params.id;
			const product = await db.Products.findOne({ where: { product_id }, include: { association: 'images' } });
			const viewPath = path.join(__dirname, '../', 'views', 'products', 'productDetail');
			const locals = {
				styles: ['/css/index.css', '/css/productDetail.css'],
				product,
				toThousand
			};
			return res.render(viewPath, locals);
		} catch (error) {
			console.log(`[ERROR] ${error}`);
		}
	},
	// edit: function (req, res) {
	// 	const promCategories = db.Products_Categories.findAll();
	// 	const promBrands = db.Brands.findAll();
	// 	const promColors = db.Colors.findAll();

	// 	Promise.all([promCategories, promBrands, promColors])
	// 		.then(results => {
	// 			db.Products.findByPk(req.params.id).then(product => {
	// 				return res.render(path.join(__dirname, '../', 'views', 'products', 'editProduct'), { styles: ['/css/index.css', '/css/productCreate.css', '/css/editProduct.css'], product, productsCategories: results[0], productsBrands: results[1], productsColors: results[2] });
	// 			})
	// 		})
	// },
	edit: async function (req, res) {
		try {
			const productCategories = await db.Products_Categories.findAll();
			const productBrands = await db.Brands.findAll();
			const productColors = await db.Colors.findAll( { include: { association: 'products' } });
			const product = await db.Products.findByPk(req.params.id);
			const viewPath = path.join(__dirname, '../', 'views', 'products', 'editProduct');
			const locals = {
				styles: ['/css/index.css', '/css/productCreate.css', '/css/editProduct.css'],
				product,
				productCategories,
				productBrands,
				productColors,
			};
			return res.render(viewPath, locals);
		} catch (error) {
			console.log(`[ERROR] ${error}`);
		}
	},
	// store: function (req, res) {
	// 	console.log('POST Request - NEW PRODUCT');
	// 	console.log(`[INFO] filename: ${req.file.filename}`);
	// 	db.Products.create({
	// 		name: req.body.name,
	// 		price: Number(req.body.price),
	// 		discount: Number(req.body.discount),
	// 		description_title: req.body.descriptionTitle,
	// 		description: req.body.description,
	// 		stock: Number(req.body.stock),
	// 		category_id: Number(req.body.category),
	// 		brand_id: Number(req.body.brand),
	// 		specs: req.body.specs
	// 	})
	// 		.then((product) => {
	// 			console.log('[INFO] new product created successfully');
	// 			db.Images.create({
	// 				product_id: product.product_id,
	// 				location: req.file.filename
	// 			}).then(() => {
	// 				console.log('[INFO] new image created successfully');
	// 				res.redirect('/products');
	// 			})
	// 		})
	// 		.catch(err => {
	// 			console.log(`[ERROR] can\'t create product: ${err}`);
	// 			return res.redirect('/products/create');
	// 		})
	// },
	store: async function (req, res) {
		try {
			console.log('POST Request - NEW PRODUCT');
			const product = {
				name: req.body.name,
				price: Number(req.body.price),
				discount: Number(req.body.discount),
				description_title: req.body.descriptionTitle,
				description: req.body.description,
				stock: Number(req.body.stock),
				category_id: Number(req.body.category),
				brand_id: Number(req.body.brand),
				specs: req.body.specs
			};
			const productCreated = await db.Products.create(product);
			console.log('[INFO] new product created successfully');
			const image = {
				product_id: productCreated.product_id,
				location: req.file.filename
			};
			await db.Images.create(image);
			console.log('[INFO] new image created successfully');
			const color = {
				product_id: productCreated.product_id,
				color_id: Number(req.body.color)
			};
			await db.Product_colors.create(color);
			console.log('[INFO] new color created successfully');
			res.redirect('/products');
		} catch (error) {
			console.log(`[ERROR] can\'t create product: ${error}`);
			return res.redirect('/products/create');
		}
	},
	// update: function (req, res) {
	// 	const promImage = db.Images.update(
	// 		{
	// 			location: req.file.filename
	// 		},
	// 		{
	// 			where: {
	// 				product_id: req.params.id
	// 			}
	// 		}
	// 	)
	// 	const promProductUpdate = db.Products.update(
	// 		{
	// 			name: req.body.name,
	// 			price: Number(req.body.price),
	// 			discount: Number(req.body.discount),
	// 			description_title: req.body.descriptionTitle,
	// 			description: req.body.description,
	// 			stock: Number(req.body.stock),
	// 			category_id: 1,
	// 			brand_id: 1,
	// 			specs: req.body.specs
	// 		},
	// 		{
	// 			where: {
	// 				product_id: req.params.id
	// 			}
	// 		}
	// 	)
	// 	Promise.all([promImage, promProductUpdate])
	// 		.then(() => {
	// 			console.log('[INFO] product updated successfully');
	// 			return res.redirect(`/products/detail/${req.params.id}`);
	// 		})
	// 		.catch(err => console.log(`[ERROR] can\'t update product: ${err}`))
	// },
	update: async function (req, res) {
		try {
			const location = req.file.filename;
			const product_id = req.params.id;
			await db.Images.update({ location }, { where: { product_id } });
			await db.Product_colors.update({ product_id: req.params.id, color_id: Number(req.params.color) }, { where: { product_id } });
			const product = {
				name: req.body.name,
				price: Number(req.body.price),
				discount: Number(req.body.discount),
				description_title: req.body.descriptionTitle,
				description: req.body.description,
				stock: Number(req.body.stock),
				category_id: Number(req.body.category),
				brand_id: Number(req.body.brand),
				specs: req.body.specs
			};
			await db.Products.update(product, { where: { product_id } });
			console.log('[INFO] product updated successfully');
			return res.redirect(`/products/detail/${product_id}`);
		} catch (error) {
			console.log(`[ERROR] can\'t update product: ${error}`);
		}
	},
	// delete: function (req, res) {
	// 	console.log('DELETE Request');
	// 	db.Images.findOne({
	// 		where: {
	// 			product_id: req.params.id
	// 		}
	// 	})
	// 		.then((image) => {
	// 			const pathRemoveFile = path.join(__dirname, '../', '../', 'uploads', 'products', image.location);
	// 			fs.unlink(pathRemoveFile)
	// 			console.log('[INFO] image file removed successfully');
	// 			db.Images.destroy({
	// 				where: {
	// 					product_id: req.params.id
	// 				}
	// 			})
	// 				.then(() => {
	// 					console.log('[INFO] image entry deleted successfully');
	// 					db.Products.destroy({
	// 						where: {
	// 							product_id: req.params.id
	// 						}
	// 					})
	// 						.then(() => {
	// 							console.log('[INFO] product entry deleted successfully');
	// 							res.redirect('/products')
	// 						})
	// 						.catch(err => {
	// 							console.log(`[ERROR] can\'t delete product entry from table: ${err}`);
	// 						})
	// 				})
	// 				.catch(err => {
	// 					console.log(`[ERROR] can\'t delete image entry from table: ${err}`);
	// 				})
	// 		})
	// 		.catch(err => {
	// 			console.log(`[ERROR] can\'t remove image file: ${err}`);
	// 		})
	// },
	delete: async function (req, res) {
		try {
			console.log('DELETE Request - DELETE PRODUCT');
			const image = await db.Images.findOne({ where: { product_id: req.params.id } });
			const pathRemoveFile = path.join(__dirname, '../', '../', 'uploads', 'products', image.location);
			await fs.unlink(pathRemoveFile);
			console.log('[INFO] image file removed successfully');
			await db.Images.destroy({ where: { product_id: req.params.id } });
			console.log('[INFO] image entry deleted successfully');
			await db.Product_colors.destroy({ where: { product_id: req.params.id } });
			console.log('[INFO] color entry deleted successfully');
			await db.Products.destroy({ where: { product_id: req.params.id } });
			console.log('[INFO] product entry deleted successfully');
			res.redirect('/products');
		} catch (error) {
			console.log(`[ERROR] can\'t delete product ${error}`);
		}
	}
};

module.exports = controller;
