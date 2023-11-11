module.exports = (sequelize, dataTypes) => {

    let alias = 'Brands'

    let cols = {
        brand_id : {
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
        tableName : 'brands',
        timestamps : false
    }

    let brand = sequelize.define(alias, cols, config);

    brand.associate = function(models){
        brand.belongsTo(models.Products, {
            as : 'products',
            foreignKey : 'brand_id'
        })
    }

    return brand
}