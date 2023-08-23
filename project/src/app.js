const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '../', 'public');

const app = express();

app.use(express.static(publicPath));
app.set('view engine', 'ejs');

const ruteIndex = require(path.join(__dirname, '../', 'routes', 'index'));
const ruteProductCart = require(path.join(__dirname, '../', 'routes', 'productCart'));
const ruteProductDetail = require(path.join(__dirname, '../', 'routes', 'productDetail'));
const ruteProductOptions = require(path.join(__dirname, '../', 'routes', 'productOptions'));

app.use('/', ruteIndex);
app.use('/productCart', ruteProductCart);
app.use('/productDetail', ruteProductDetail);
app.use('/productOptions',ruteProductOptions);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
