module.exports = (sequelize, dataTypes) => {

    let alias = 'Colors'

    let cols = {
        color_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false,
            unique: true
        },
        hex_values : {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }

    let config = {
        tableName : 'colors',
        timestamps : false
    }

    let color = sequelize.define(alias, cols, config);

    color.associate = function(models){
        color.belongsToMany(models.Products, {
            as : 'products',
            through: 'product_colors',
            foreignKey : 'color_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }
    return color
}