const db = require('../database/models');
const sequelize = require('sequelize')

module.exports = {
	singleProduct: async function (req, res) {
		const product = await db.Products.findOne({
			where: {
				product_id: req.params.id
			},
			include: {
				association: 'images'
			}
		});
		return res.json({
			data: product,
			status: 200,
		});
	},

	listOfProducts: async function (req, res) {
		const products = await db.Products.findAll({
			include: [
				{ association: 'images' },
				// { association: 'product_category' }
			  ]
		});
		const productsCategories = await db.Products_Categories.findAll();
		const productsBrands = await db.Brands.findAll();
		const productsColors = await db.Colors.findAll();
		const countByCategory = await db.Products_Categories.findAll({
			attributes: [
				'name',
				[sequelize.fn('COUNT', sequelize.col('products.product_id')), 'count']
			],
			include: [
				{
					model: db.Products,
					as: 'products',
					attributes: [],
					required: false,
					on: {
						'products.category_id': sequelize.col('products_categories.category_id')
					}
				}
			],
			group: ['products_categories.category_id', 'products_categories.name'],
		});

		return res.json({
			count: products.length,
			countByCategory,
			data: {
				products,
				productsCategories,
				productsBrands,
				productsColors,
				imageUrl: 'http://localhost:4000/images/'
			},
			status: 200,
		});
	},

	singleUser: async function (req, res) {
		const user = await db.Users.findOne({
			where: {
				user_id: req.params.id
			}
		});

		const userData = { ...user.get(), image: undefined, password: undefined, category_id: undefined};

		return res.json({
			data: userData,
			detail: user ? user.image : null,
			status: 200
		});

	},

	listOfUsers: async function (req, res) {
		const users = await db.Users.findAll({
			attributes: [
				'user_id',
				'first_name',
				'last_name',
				'email',
				['image','detail']
			]
		});

		return res.json({
			count: users.length,
			users: users,
			status: 200,
		});

	},
}
