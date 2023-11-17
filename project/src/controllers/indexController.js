const path = require('path');
const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: function (req, res) {
		const viewPath = path.join(__dirname, '../', 'views', 'index');
		const locals = { styles: ['/css/index.css'] }
		return res.render(viewPath, locals);
	},
	productImage: function (req, res) {
		const imagePath = path.join(__dirname, '../', '../', 'uploads', 'products', req.params.filename);
		res.sendFile(imagePath);
	},
	result: async function (req, res) {
		const products = await db.Products.findAll({ include: { association: 'images' } });
		const found = await products.filter(temp => temp.name.toLowerCase().includes(req.query.search.toLowerCase()));
		const viewPath = path.join(__dirname, '../', 'views', 'products', 'resultSearch');
		const locals = {
			styles: ['/css/index.css', '/css/products.css'],
			products: found,
			toThousand
		}
		return res.render(viewPath, locals);
	}
}

module.exports = controller;
