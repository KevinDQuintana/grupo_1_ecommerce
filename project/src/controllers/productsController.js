const fs = require('fs');
const path = require('path');
const { title } = require('process');
const productsFilePath = path.join(__dirname, '../', 'data', 'productsDataBase.json');

function getProducts() {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: function (req, res) {
		const products = getProducts();
		return res.render(path.join(__dirname, '../', 'views', 'products', 'products'), { styles: ['/css/index.css', '/css/products.css'], products, toThousand });
	},
	create: function (req, res) {
		return res.render(path.join(__dirname, '../', 'views', 'products', 'createProduct'), { styles: ['/css/index.css', '/css/productCreate.css'] });
	},
	detail: (req, res) => {
		const products = getProducts();
		const id = req.params.id;
		const productFound = products.find(product => product.id == id);
		const array = (productFound.characteristics).split('\r\n')
		return res.render(path.join(__dirname, '../', 'views', 'products', 'productDetail'), { styles: ['/css/index.css', '/css/productDetail.css'], product: productFound, array, toThousand });
	},
	edit: function (req, res) {
		const id = req.params.id;
		console.log(`Edit Request with ID: ${id}`);
		const products = getProducts();
		const product = products.find((element) => element.id == id)
		return res.render(path.join(__dirname, '../', 'views', 'products', 'editProduct'), { styles: ['/css/index.css', '/css/productCreate.css', '/css/editProduct.css'], id, product});
	},
	store: function (req, res) {
		const products = getProducts();
		const newId = products[products.length - 1].id + 1;
		const newProduct = {
			id: newId,
			image: req.file.filename,
			name: req.body.name,
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			descriptionTitle: req.body.descriptionTitle,
			description: req.body.description,
			stock: req.body.stock,
			characteristics: req.body.characteristics,
			category: req.body.category,
			brand: req.body.brand,
			color: req.body.color
		};

		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
		return res.redirect('/products');
	},
	update: function (req, res) {
		console.log(`Update Request with ID: ${req.params.id}`);
		console.log('----REQUEST----');
		console.log(req.body);
		console.log(req.file);
		console.log('---------------');
		console.log('');
		const products = getProducts();
		const product = products.find((element) => element.id == req.params.id);

		product.name = req.body.name;
		product.price = req.body.price;
		product.discount = req.body.discount;
		product.category = req.body.category;
		product.description = req.body.description;
		product.image = req.file.filename;

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));

		return res.redirect(`/products/detail/${req.params.id}`);
	}
};

module.exports = controller;
