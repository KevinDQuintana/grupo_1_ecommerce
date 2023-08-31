const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../', 'data', 'productsDataBase.json');

function getProducts() {
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: function(req,res) {
        const products = getProducts();
        return res.render(path.join(__dirname, '../', 'views' ,'products', 'products'), { products, toThousand });
    },
    detail: (req, res) => {
		const products = getProducts();
		const id = req.params.id;
		const productFound = products.find(product => product.id == id);
		return res.render(path.join(__dirname, '../', 'views' ,'products', 'productDetail'), { product: productFound, toThousand });
	},
    create: function(req,res) {
        return res.render(path.join(__dirname, '../', 'views', 'products', 'addProduct'));
    },
    store: function(req,res) {
        const products = getProducts();
        const newId = products[products.length - 1].id + 1;
        const newProduct = {
			id: newId,
			name: req.body.name,
			description: req.body.description,
			image: req.file.filename,
			discount: Number(req.body.discount),
			price: Number(req.body.price),
			category: req.body.category,
		};

		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		return res.redirect('/products');
    }
}

module.exports = controller;
