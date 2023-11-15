const path = require('path');

const controller = {
	index: function (req, res) {
		const viewPath = path.join(__dirname, '../', 'views', 'index');
		const locals = { styles: ['/css/index.css'] }
		return res.render(viewPath, locals);
	},
	productImage: function (req, res) {
		const imagePath = path.join(__dirname, '../', '../', 'uploads', 'products', req.params.filename);
		res.sendFile(imagePath);
	}
}

module.exports = controller;
