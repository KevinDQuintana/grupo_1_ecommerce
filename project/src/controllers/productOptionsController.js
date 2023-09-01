const path = require('path');

const controller = {
	add: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'products', 'addProduct'), { styles: ['/css/index.css'] });
	},
	edit: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'products', 'editProduct'), { styles: ['/css/index.css'] });
	}
}

module.exports = controller;