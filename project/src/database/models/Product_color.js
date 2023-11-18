module.exports = (sequelize, dataTypes) => {

    let alias = 'Product_colors'

    let cols = {
        product_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            allowNull : false
        },
        color_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            allowNull : false
        }
    }

    let config = {
        tableName : 'product_colors',
        timestamps : false
    }

    let productColor = sequelize.define(alias,cols,config)

    return productColor
}