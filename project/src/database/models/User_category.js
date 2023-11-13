module.exports = (sequelize, dataTypes) => {

    let alias = 'User_categories'

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
        tableName : 'users_categories',
        timestamps : false
    }

    let userCategory = sequelize.define(alias, cols, config);

    userCategory.associate = function(models){
        userCategory.belongsTo(models.Users, {
            as : 'users',
            foreignKey : 'category_id'
        })
    }

    return userCategory
}