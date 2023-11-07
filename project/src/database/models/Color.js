module.exports = (sequelize, dataTypes) => {

    let alias = 'Colors'

    let cols = {
        product_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primeryKey : true,
            allowNull : false
        },
        name : {
            type : dataTypes.VARCHAR(100),
            allowNull : false
        }
    }

    let config = {
        tableName : 'colors',
        timestamps : true
    }

    let color = sequelize.define(alias, cols, config);

    color.associate = function(models){
        color.hasMany(models.Products, {
            as : 'products',
            foreignKey : 'product_id'
        })
    }
    return color
}