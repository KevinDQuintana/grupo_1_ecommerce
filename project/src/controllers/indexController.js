const path = require('path');

const controller = {
	index: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'index'), { styles: ['/css/index.css'] });
	}
}

module.exports = controller;
