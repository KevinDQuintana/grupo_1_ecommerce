const path = require('path');

const controller = {
	index: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'index'), { styles: ['/css/index.css'] });
	},
	productImage: function (req, res) {
		res.sendFile(path.join(__dirname, '../', '../', 'uploads', 'products', req.params.filename));
	}
}

module.exports = controller;
