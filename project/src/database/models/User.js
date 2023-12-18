module.exports = (sequelize , dataTypes) => {

    let alias = 'Users'

    let cols = {
        user_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        first_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        last_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        email : {
            type : dataTypes.STRING(255),
            allowNull : false
        },
        password : {
            type : dataTypes.STRING(255),
            allowNull : false
        },
        dni : {
            type : dataTypes.STRING(8),
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
            type : dataTypes.STRING,
            allowNull : false
        },
    }

    let config = {
        tableName : 'users',
        timestamps : true,
		createdAt: 'created_at',
  		updatedAt: 'updated_at',
    }

    const user = sequelize.define(alias, cols, config);

    user.associate = function(models){
        user.hasMany(models.User_Categories, {
            as : 'user_category',
            foreignKey : 'category_id'
        });
        user.belongsTo(models.Shopping_Carts, {
            as : 'shopping_cart',
            foreignKey : 'user_id'
        })
    }

    return user
}