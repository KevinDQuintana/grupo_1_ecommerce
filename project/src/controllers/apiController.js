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
		const products = await db.Products.findAll();
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
			data: products,
			status: 200,
		});
	},
}
