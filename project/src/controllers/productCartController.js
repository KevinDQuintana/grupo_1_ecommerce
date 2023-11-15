const path = require('path');

const controller = {
	index: function (req, res) {
		const viewPath = path.join(__dirname, '../', 'views', 'products', 'productCart');
		const locals = { styles: ['/css/index.css', '/css/productCart.css'] };
		return res.render(viewPath, locals);
	}
}

module.exports = controller;
