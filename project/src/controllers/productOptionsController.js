const path = require('path');

const controller = {
    // index: function (req,res) {
    //     res.render(path.join(__dirname, '../', 'src', 'views', 'products', ''));
    // },
    add: function(req,res) {
        res.render(path.join(__dirname, '../', 'src', 'views', 'products', 'addProduct'));
    },
    edit: function(req,res) {
        res.render(path.join(__dirname, '../', 'src', 'views', 'products', 'editProduct'));
    }
}

module.exports = controller;