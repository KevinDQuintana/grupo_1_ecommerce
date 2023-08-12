const controller = {
    index: function(req,res) {
        res.render(require.resolve('../src/views/products/productCart.ejs'));
    }
}

module.exports = controller;