const controller = {
    id: function(req,res) {
        res.render(require.resolve('../src/views/products/productDetail.ejs'));
    }
}

module.exports = controller;