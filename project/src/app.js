const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const publicPath = path.resolve(__dirname, '../', 'public');

app.use(express.static(publicPath));

app.set('view engine','ejs');

const ruteProductCart = require('../routes/productCart');
const ruteProductDetail = require('../routes/productDetail');

app.use('/productCart',ruteProductCart);
app.use('/productDetail',ruteProductDetail);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});
app.get('/register', function (req, res) {
     res.sendFile(path.resolve(__dirname, 'views', 'register.html')) 
});
app.get('/login', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'views', 'login.html')) 
});