const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const publicPath = path.resolve(__dirname, '../', 'public');

app.use(express.static(publicPath));
app.set('view engine', 'ejs');

const ruteIndex = require(path.join(__dirname, '../', 'routes', 'index'))
const ruteProductCart = require('../routes/productCart');
const ruteProductDetail = require('../routes/productDetail');

app.use('/', ruteIndex);
app.use('/productCart', ruteProductCart);
app.use('/productDetail', ruteProductDetail);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
