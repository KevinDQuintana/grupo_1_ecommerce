const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const PORT = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '../', 'public');

const app = express();

app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const ruteIndex = require(path.join(__dirname, 'routes', 'index'));
const ruteProducts = require(path.join(__dirname, 'routes', 'products')); // ruteProducts
const ruteProductCart = require(path.join(__dirname, 'routes', 'productCart'));

app.use('/', ruteIndex);
app.use('/products', ruteProducts); // Nueva ruta '/products'
app.use('/productCart', ruteProductCart);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
