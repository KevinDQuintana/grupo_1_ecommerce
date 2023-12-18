const db = require('../database/models');
const path = require('path');
const { Op } = require('sequelize');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const controller = {
	login: function (req, res) {
		const viewPath = path.join(__dirname, '../', 'views', 'users', 'login');
		const locals = { styles: ['/css/index.css', '/css/login.css'] };
		res.render(viewPath, locals);
	},
	logOut: async function (req, res) {
		console.log('[INFO] user wants to logout')
		await req.session.destroy();
		console.log('[INFO] session destroyed');
		res.clearCookie('session');
		console.log('[INFO] cookie cleared');
		res.redirect('/');
	},
	profile: function (req, res) {
		const viewPath = path.join(__dirname, '..', 'views', 'users', 'profile');
		const locals = {
			styles: ['/css/index.css', '/css/profile.css'],
			user: req.session.user
		};
		return res.render(viewPath, locals)
	},
	// processLogin: function (req, res) {
	// 	console.log('POST Request');
	// 	console.log(req.body);

	// 	const errors = validationResult(req);

	// 	if (errors.isEmpty()) {
	// 		db.Users.findOne({
	// 			where: {
	// 				email: req.body.email
	// 			}
	// 		}).then(user => {
	// 			if (user) {
	// 				console.log('User Found');
	// 				// console.log(user)
	// 				console.log(`Required User Password: ${user.password}`);

	// 				if (bcryptjs.compareSync(req.body.password, user.password)) {
	// 					console.log('User Password is Correct')
	// 					req.session.userLogged = user;
	// 					req.session.user = {
	// 						id: user.user_id,
	// 						email: user.email,
	// 						fName: user.first_name,
	// 						lName: user.last_name,
	// 					};
	// 					console.log('Successful Login')

	// 					if (req.body.rememberMe) {
	// 						console.log('The user wants to be remembered.');
	// 						res.cookie('session', req.session.user, { maxAge: 900000 });
	// 						console.log('Cookie Set');
	// 					}
	// 					return res.redirect('/')
	// 				} else {
	// 					console.log('User Password is Incorrect')
	// 					return res.render(path.join(__dirname, '..', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], validation: { email: { msg: 'Credenciales invÃ¡lidas' } }, oldData: req.body });
	// 				}
	// 			} else {
	// 				console.log('User Not Found')
	// 				return res.render(path.join(__dirname, '..', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], validation: { email: { msg: 'No se encuentra este email' } }, oldData: req.body });
	// 			}
	// 		})
	// 	} else {
	// 		console.log('Login Errors:');
	// 		console.log(errors);
	// 		return res.render(path.join(__dirname, '../', 'views', 'users', 'login'), { styles: ['/css/index.css', '/css/login.css'], errors: errors.mapped(), oldData: req.body })
	// 	}
	// },
	processLogin: async function (req, res) {
		console.log('POST Request - LOGIN');
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			const user = await db.Users.findOne({ where: { email: req.body.email } });

			if (user) {
				console.log('[INFO] user found');
				console.log(`[INFO] required user password: ${user.password}`);

				if (bcryptjs.compareSync(req.body.password, user.password)) {
					console.log('[INFO] user password is correct')
					req.session.userLogged = user;
					req.session.user = {
						id: user.user_id,
						email: user.email,
						fName: user.first_name,
						lName: user.last_name,
						image: user.image,
					};

					if (req.body.rememberMe) {
						console.log('[INFO] the user wants to be remembered');
						res.cookie('session', req.session.user, { maxAge: 900000 });
						console.log('[INFO] cookie set');
					};

					console.log('[SUCCESS] successful login');
					return res.redirect('/');
				} else {
					console.log('[ERROR] user password is incorrect')
					const viewPath = path.join(__dirname, '..', 'views', 'users', 'login');
					const locals = {
						styles: ['/css/index.css', '/css/login.css'],
						validation: { email: { msg: 'Credenciales inválidas' } },
						oldData: req.body
					};

					return res.render(viewPath, locals);
				}
			} else {
				console.log('[INFO] user not found');
				const viewPath = path.join(__dirname, '..', 'views', 'users', 'login');
				const locals = {
					styles: ['/css/index.css', '/css/login.css'],
					validation: { email: { msg: 'No se encuentra este email' } },
					oldData: req.body
				};

				return res.render(viewPath, locals);
			}
		} else {
			console.log('[ERROR] login errors:');
			console.log(errors);
			const viewPath = path.join(__dirname, '../', 'views', 'users', 'login');
			const locals = {
				styles: ['/css/index.css', '/css/login.css'],
				errors: errors.mapped(),
				oldData: req.body
			};

			return res.render(viewPath, locals)
		}
	},
	// signup: function (req, res) {
	// 	db.User_Categories.findAll()
	// 		.then(usersCategories => {
	// 			return res.render(path.join(__dirname, '../', 'views', 'users', 'signup'), { styles: ['/css/index.css', '/css/signup.css'], usersCategories });
	// 		})
	// },
	signup: async function (req, res) {
		try {
			const userCategories = await db.User_Categories.findAll();
			const viewPath = path.join(__dirname, '../', 'views', 'users', 'signup');
			const locals = {
				styles: ['/css/index.css', '/css/signup.css'],
				userCategories
			};
			return res.render(viewPath, locals);
		} catch (error) {
			console.log(`[ERROR] ${error}`);
		}
	},
	processSignup: async function (req, res) {
		try {
			console.log('POST Request - NEW USER');
			const errors = validationResult(req);
			const userCategories = await db.User_Categories.findAll();
			const viewPath = path.join(__dirname, '../', 'views', 'users', 'signup');
			const locals = {
				styles: ['/css/index.css', '/css/signup.css'],
				errors: errors.mapped(),
				oldData: req.body,
				userCategories
			}

			if (errors.isEmpty()) {
				const conditions = [
					{ email: req.body.email },
					{ dni: req.body.dni }
				];
				const userExists = await db.Users.findOne({ where: { [Op.or]: conditions } });

				if (!userExists) {
					const user = {
						first_name: req.body.firstName,
						last_name: req.body.lastName,
						email: req.body.email,
						password: bcryptjs.hashSync(req.body.password, 10),
						dni: req.body.dni,
						phone: req.body.phone,
						category_id: Number(req.body.category),
						image: req.file.filename
					};
					await db.Users.create(user);
					console.log('[INFO] user created successfully');
					return res.redirect('/');
				} else {
					console.log('[INFO] user already exists');
					const email = await db.Users.findOne({ where: { email: req.body.email } });
					const dni = await db.Users.findOne({ where: { dni: req.body.dni } });
					if (email && dni) {
						const locals = {
							styles: ['/css/index.css', '/css/signup.css'],
							validation: { email: { msg: 'Este email ya esta registrado' } , dni: { msg: 'Este dni ya esta registrado' } },
							oldData: req.body,
							userCategories
						}
						return res.render(viewPath, locals);
					} else {
						if (email) {
							const locals = {
								styles: ['/css/index.css', '/css/signup.css'],
								validation: { email: { msg: 'Este email ya esta registrado' } },
								oldData: req.body,
								userCategories
							}
							return res.render(viewPath, locals);
						}
						if (dni) {
							const locals = {
								styles: ['/css/index.css', '/css/signup.css'],
								errors: errors.mapped(),
								validation: { dni: { msg: 'Este dni ya esta registrado' } },
								oldData: req.body,
								userCategories
							}
							return res.render(viewPath, locals);
						}
					}
	
				}
			} else {
				console.log(`[Validation] ${errors.mapped()}`);
				return res.render(viewPath, locals);
			}
		} catch (error) {
			console.log(`[ERROR] ${error}`);
		}
	}
}

module.exports = controller;