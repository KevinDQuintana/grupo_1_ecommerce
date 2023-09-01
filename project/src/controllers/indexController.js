const path = require('path');

const controller = {
	index: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'index'), { styles: ['/css/index.css'] });
	},

	login: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'] });
	},

	signup: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'] });
	}
}

module.exports = controller;
