const path = require('path');

const controller = {
	index: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'products', 'productCart'));
	}
}

module.exports = controller;
