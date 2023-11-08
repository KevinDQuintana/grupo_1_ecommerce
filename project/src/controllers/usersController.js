const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
let db = require('../database/models');

/* deprecated function, marked to be removed */
const usersFilePath = path.join(__dirname, '../', 'data', 'users.json');
/* END */

/* deprecated function, marked to be removed */
function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}
/* END */

const controller = {
	login: function (req, res) {
		res.render(path.join(__dirname, '../', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'] });
	},
	logOut: function (req, res) {
		console.log('User Wants to LogOut')
		req.session.destroy();
		res.clearCookie('session');
		res.redirect('/');
	},
	profile: function (req, res) {
		return res.render(path.join(__dirname, '..', 'views', 'users', 'profile'), { styles: ['/css/index.css'], user: req.session.userLogged })
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

				if (bcryptjs.compareSync(req.body.password, requiredUser.password)) {
					console.log('User Password is Correct')
					req.session.userLogged = requiredUser;
				} else {
					console.log('User Password is Incorrect')
					return res.render(path.join(__dirname, '..', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], validation: { email: { msg: 'Credenciales inválidas' } }, oldData: req.body });
				}
			} else {
				console.log('User Not Found')
				return res.render(path.join(__dirname, '..', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], validation: { email: { msg: 'No se encuentra este email' } }, oldData: req.body });
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
				res.cookie('session', req.session.user, { maxAge: 900000 });
				console.log('Cookie Set');
			}
			return res.redirect('/')
		} else {
			console.log('Login Errors:');
			console.log(errors);
			return res.render(path.join(__dirname, '../', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], errors: errors.mapped(), oldData: req.body })
		}

	},
	processLogin: function (req, res) {
		console.log('POST Request');
		console.log(req.body);

		db.Users.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			console.log('User Found');
			// console.log(user)
			console.log(`Required User Password: ${user.password}`);

			if (bcryptjs.compareSync(req.body.password, user.password)) {
				console.log('User Password is Correct')
				req.session.userLogged = user;
				req.session.user = {
					id: user.user_id,
					email: user.email,
					fName: user.first_name,
					lName: user.last_name,
				};
				console.log('Successful Login')

				if (req.body.rememberMe) {
					console.log('The user wants to be remembered.');
					res.cookie('session', req.session.user, { maxAge: 900000 });
					console.log('Cookie Set');
				}
				return res.redirect('/')
			} else {
				console.log('User Password is Incorrect')
				return res.render(path.join(__dirname, '..', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], validation: { email: { msg: 'Credenciales inválidas' } }, oldData: req.body });
			}
		})
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
			password: bcryptjs.hashSync(req.body.password, 10),
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