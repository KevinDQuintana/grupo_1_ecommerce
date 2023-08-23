const path = require('path');

const controller = {
	index: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'index'));
	},

	login: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'users', 'login'));
	},

	signup: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'users', 'signup'));
	}
}

module.exports = controller;
