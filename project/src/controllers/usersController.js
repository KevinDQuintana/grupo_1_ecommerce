const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../', 'data', 'users.json');
const { validationResult } = require('express-validator');

function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

const controller = {

	login: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'] });
	},

	signup: function (req, res) {
		return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'] });
	},
	processRegister: function (req,res) {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'] , errors: resultValidation.mapped() , oldData: req.body});
		}
		const users = getUsers();
		const newId = users[users.length - 1].id + 1;
		const newUser = {
			id: newId,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			dni: req.body.dni,
			phone: req.body.phone,
			category: req.body.category,
			image: req.file.filename
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '\t'));
		return res.redirect('/users');
	}
}

module.exports = controller;