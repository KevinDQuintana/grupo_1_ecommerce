const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
let db = require('../database/models');

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
			db.Users.findOne({
				where: {
					email: req.body.email
				}
			}).then(user => {
				if (user) {
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
						return res.render(path.join(__dirname, '..', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], validation: { email: { msg: 'Credenciales invÃ¡lidas' } }, oldData: req.body });
					}
				} else {
					console.log('User Not Found')
					return res.render(path.join(__dirname, '..', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], validation: { email: { msg: 'No se encuentra este email' } }, oldData: req.body });
				}
			})
		} else {
			console.log('Login Errors:');
			console.log(errors);
			return res.render(path.join(__dirname, '../', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], errors: errors.mapped(), oldData: req.body })
		}
	},
	signup: function (req, res) {
		db.User_categories.findAll()
			.then(usersCategories => {
				return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'], usersCategories });
			})
	},
	processSignup: function (req, res) {
		console.log('POST Request - NEW USER');
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'], errors: resultValidation.mapped(), oldData: req.body });
		}
		db.Users.create({
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
			dni: req.body.dni,
			phone: req.body.phone,
			category_id: Number(req.body.category),
			image: req.file.filename
		})
			.then(() => {
				console.log('[INFO] user created successfully');
				return res.redirect('/')
			})
	}
}

module.exports = controller;