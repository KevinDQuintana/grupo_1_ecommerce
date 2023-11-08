module.exports = (sequelize, dataTypes) => {

    let alias = 'Products_categories'

    let cols = {
        category_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false
        }
    }

    let config = {
        tableName : 'products_categories',
        timestamps : true
    }

    let product_category = sequelize.define(alias, cols, config);

    product_category.associate = function(models){
        product_category.belongsTo(models.Products, {
            as : 'products',
            foreignKey : 'category_id'
        })
    }

    return product_category
}