module.exports = (sequelize , dataTypes) => {

    let alias = 'Users'

    let cols = {
        user_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primeryKey : true,
            allowNull : false
        },
        first_name : {
            type : dataTypes.VARCHAR(100),
            allowNull : false
        },
        last_name : {
            type : dataTypes.VARCHAR(100),
            allowNull : false
        },
        email : {
            type : dataTypes.VARCHAR(255),
            allowNull : false
        },
        password : {
            type : dataTypes.VARCHAR(255),
            allowNull : false
        },
        dni : {
            type : dataTypes.VARCHAR(8),
            allowNull : false
        },
        phone : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        category_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        image : {
            type : dataTypes.TEXT,
            allowNull : false
        },
    }

    let config = {
        tableName : 'users',
        timestamps : true
    }
    
    const user = sequelize.define(alias, cols, config);

    user.associate = function(models){
        user.hasMany(models.User_categories, {
            as : 'user_category',
            foreignKey : 'category_id'
        })
    }
    user.associate = function(models){
        user.belongTo(models.Shoppings_carts, {
            as : 'shopping_cart',
            foreignKey : 'user_id'
        })
    }

    return user
}