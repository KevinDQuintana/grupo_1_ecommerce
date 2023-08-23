const path = require('path');

const controller = {
	index: function (req, res) {
		res.render(path.join(__dirname, '../', 'src', 'views', 'index'));
	},

	login: function (req, res) {
		res.render(path.join(__dirname, '../', 'src', 'views', 'users', 'login'));
	},

	signup: function (req, res) {
		res.render(path.join(__dirname, '../', 'src', 'views', 'users', 'signup'));
	}
}

module.exports = controller;
