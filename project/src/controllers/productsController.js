const fs = require('fs');
const path = require('path');
const { title } = require('process');
const productsFilePath = path.join(__dirname, '../', 'data', 'productsDataBase.json');

const db = require('../database/models');

/* deprecated function, marked to be removed */
function writeProducts(product) {
	fs.writeFileSync(productsFilePath, JSON.stringify(product, null, '\t'))
};
/* END */

/* deprecated function, marked to be removed */
function getProducts() {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}
/* END */

/* deprecated function, marked to be removed */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/* END */

const controller = {
	index: function (req, res) {
		db.Products.findAll({ include: { association: 'images' } })
			.then(products => {
				// console.log('List All Products Query')
				// console.log(products)
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
	/* deprecated function, marked to be removed */
	// detail: function (req, res) {
	// 	const products = getProducts();
	// 	const id = req.params.id;
	// 	const productFound = products.find(product => product.id == id);
	// 	return res.render(path.join(__dirname, '../', 'views', 'products', 'productDetail'), { styles: ['/css/index.css', '/css/productDetail.css'], product: productFound, toThousand });
	// },
	/* END */
	detail: function (req, res) {
		// db.Products.findByPk(req.params.id).then(product => {
		// 	return res.render(path.join(__dirname, '../', 'views', 'products', 'productDetail'), { styles: ['/css/index.css', '/css/productDetail.css'], product, toThousand });
		// })
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
		console.log(`Edit Request with ID: ${req.params.id}`);
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
		console.log('POST Request')
		console.log(req.body);
		db.Products.create({
			name: req.body.name,
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			description_title: req.body.descriptionTitle,
			description: req.body.description,
			stock: Number(req.body.stock),
			category_id: 1,
			brand_id: 1,
			specs: req.body.specs
		})
			.then((product) => {
				console.log('[INFO] new product created succesfully');
				db.Images.create({
					product_id: product.product_id,
					location: req.file.filename
				}).then(() => {
					console.log('[INFO] new image created succesfully');
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
				console.log('[INFO] product updated succesfully');
				return res.redirect(`/products/detail/${req.params.id}`);
			})
			.catch(err => console.log(`[ERROR] can\'t update product: ${err}`))
	},
	delete: function (req, res) {
		const id = req.params.id;
		if (!id) return res.send('Error');
		const products = getProducts();
		writeProducts(products.filter((product) => {
			return product.id != req.params.id
		}));

		res.redirect('/products')
	}
};

module.exports = controller;
