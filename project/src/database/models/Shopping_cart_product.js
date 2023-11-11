module.exports = (sequelize, dataTypes) => {

    let alias = 'Shopping_cart_products'

    let cols = {
        shopping_cart_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        product_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
    
        }
    }
	
	let config = {}
    let shoppingCartProduct = sequelize.define(alias, cols, config);

    return shoppingCartProduct
}