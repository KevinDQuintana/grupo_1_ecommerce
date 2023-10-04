const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../', 'data', 'users.json');

function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

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
	profile: function (req,res) {
		return res.render(path.join(__dirname, '..', 'views', 'users', 'profile'), { styles: ['/css/index.css'], user: req.session.userLogged});
	},
	processLogin: function (req, res) {
		console.log('POST Request');
		console.log(req.body);

		const errors = validationResult(req);



		if (errors.isEmpty()) {

			let userToLogin = User.findByField('email',req.body.email);

			if (userToLogin) {
				console.log('User Found')
				console.log(`Required User Password: ${userToLogin.password}`);
				console.log(req.body.password);
				console.log(bcrypt.compareSync((req.body.password), (userToLogin.password)));
				if (bcrypt.compare(req.body.password, userToLogin.password)) {
					console.log('User Password is Correct');
					console.log('Successful Login')
					delete userToLogin.password;
					req.session.userLogged = userToLogin;
					return res.redirect('/users/profile');
				} else {
					console.log('User Password is Incorrect')
					return res.render(path.join(__dirname, '../', 'views', 'users', 'login'),
			 		{ 
						styles: ['/css/index.css', '/css/login.css'],
						errors: 
			 				{ email: 
								{ msg: 'Credenciales inválidas' } 
							}, 
								oldData: req.body 
					});
				}
			} else {
				console.log('User Not Found')
				return res.render(path.join(__dirname, '../', 'views', 'users', 'login'),
			 		{ 
						styles: ['/css/index.css', '/css/login.css'],
						errors: 
			 				{ email: 
								{ msg: 'No se encuentra este email' } 
							}, 
								oldData: req.body 
					});
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
			return res.redirect('/users/login')
		}

	},
	signup: function (req, res) {
		return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'] });
	},
	processSignup: function (req, res) {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'], errors: resultValidation.mapped(), oldData: req.body });
		}
		let userInDB = User.findByField('email',req.body.email);
		if (userInDB) {
			return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'], errors: { email: { msg: 'Este email ya esta registrado' } }, oldData: req.body });
		}
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: bcrypt.hashSync("req.body.password", 10),
			dni: req.body.dni,
			phone: req.body.phone,
			category: req.body.category,
			image: req.file.filename
		};
		let userCreated = User.create(newUser);
		return res.redirect('/');
	}
}

module.exports = controller;