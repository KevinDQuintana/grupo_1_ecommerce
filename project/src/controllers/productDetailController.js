const path = require('path');

const controller = {
	index: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'products', 'productDetail'));
	},

	// id: function (req, res) {
	// 	res.render(path.join(__dirname, '../', 'src', 'views', 'products', 'productDetail'));
	// }
}

module.exports = controller;
