const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../', 'data', 'users.json');

function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

const controller = {
	login: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'] });
	},
	logOut: function (req, res) {
		req.session.destroy();
		res.clearCookie('cookie');
		res.redirect('/');
	},
	processLogin: function (req, res) {
		console.log('POST Request');
		console.log(req.body);

		const errors = validationResult(req);

		if (errors.isEmpty()) {
			const users = getUsers();
			const requiredUser = users.find(user => user.email === req.body.email);

			if (requiredUser) {
				console.log('User Found')
				console.log(`Required User Password: ${requiredUser.password}`);

				if (bcrypt.compareSync(req.body.password, requiredUser.password)) {
					console.log('User Password is Correct')
				} else {
					console.log('User Password is Incorrect')
					return res.redirect('/users/login')
				}
			} else {
				console.log('User Not Found')
				return res.redirect('/users/login')
			}
			console.log('Successful Login')
			req.session.user = {
				id: requiredUser.id,
				email: requiredUser.email,
				fName: requiredUser.firstName,
				lName: requiredUser.lastName,
			};

			if (req.body.rememberMe) {
				console.log('The user wants to be remembered.');
				res.cookie('cookie', req.session.user, { maxAge: 900000 });
				console.log('Cookie Set');
			}
			return res.redirect('/')
		} else {
			console.log('Login Errors:');
			console.log(errors);
			return res.redirect('/users/login')
		}

	},
	signup: function (req, res) {
		return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'] });
	},
	processSignup: function (req, res) {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'], errors: resultValidation.mapped(), oldData: req.body });
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
		return res.redirect('/');
	}
}

module.exports = controller;