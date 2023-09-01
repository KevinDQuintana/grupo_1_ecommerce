const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '../', 'public');

const app = express();

app.use(express.static(publicPath));
app.set('view engine', 'ejs');

const ruteIndex = require(path.join(__dirname, 'routes', 'index'));
const ruteProducts = require(path.join(__dirname, 'routes', 'products')); // ruteProducts
const ruteProductCart = require(path.join(__dirname, 'routes', 'productCart'));
const ruteProductOptions = require(path.join(__dirname, 'routes', 'productOptions'));

app.use('/', ruteIndex);
app.use('/products', ruteProducts); // Nueva ruta '/products'
app.use('/productCart', ruteProductCart);
// app.use('/productOptions',ruteProductOptions);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
