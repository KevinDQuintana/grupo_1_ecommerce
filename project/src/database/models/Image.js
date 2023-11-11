module.exports = (sequelize, dataTypes) => {

    let alias = 'Images'

    let cols = {
        product_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            allowNull : false
        },
        location : {
            type : dataTypes.TEXT,
            allowNull : false
        }
    }

    let config = {
        tableName : 'images',
        timestamps : false
    }

    let image = sequelize.define(alias, cols, config);

    image.associate = function(models){
        image.hasMany(models.Products, {
            as : 'products',
            foreignKey : 'product_id'
        })
    }

    return image
}