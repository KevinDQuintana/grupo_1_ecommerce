module.exports = (sequelize, dataTypes) => {

    let alias = 'Products'

    let cols = {
        product_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING(255),
            allowNull : false
        },
        price : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        discount : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        description_title : {
            type : dataTypes.STRING(255),
            allowNull : false
        },
        description : {
            type : dataTypes.TEXT,
            allowNull : false
        },
        stock : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        category_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        brand_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        specs : {
            type : dataTypes.TEXT,
            allowNull : false
        },
    }

    let config = {
        tableName : 'products',
        timestamps : true,
        createdAt: 'created_at',
  		updatedAt: 'updated_at'
    }
    const product = sequelize.define(alias, cols, config);

    product.associate = function(models){
        product.belongsTo(models.Colors, {
            as : 'colors',
            foreignKey : 'product_id'
        })
        product.hasMany(models.Products_Categories, {
            as : 'product_category',
            foreignKey : 'category_id'
        })
        product.belongsTo(models.Images, {
            as : 'images',
            foreignKey : 'product_id'
        })
        product.hasMany(models.Brands, {
            as : 'brands',
            foreignKey : 'brand_id'
        })
    }

    return product
}