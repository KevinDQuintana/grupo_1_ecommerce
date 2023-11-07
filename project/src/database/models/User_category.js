module.exports = (sequelize, dataTypes) => {

    let alias = 'User_categories'

    let cols = {
        category_id : {
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
        tableName : 'user_categories',
        timestamps : true
    }

    let userCategory = sequelize.define(alias, cols, config);

    userCategory.associate = function(models){
        userCategory.belongsTo(models.User, {
            as : 'users',
            foreignKey : 'category_id'
        })
    }

    return userCategory
}