const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = 'Shoppings_carts'

    let cols = {
        shopping_cart_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        user_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        number_of_items : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        total_price : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
    }

    let config = {
        tableName : 'shopping_cart',
        timestamps : true
    }

    const shoppingCart = sequelize.define(alias, cols, config);

    shoppingCart.associate = function(models){
        shoppingCart.hasMany(models.Users, {
            as : 'users',
            foreignKey : 'user_id'
        })
    }

    return shoppingCart
}