const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const publicPath = path.resolve(__dirname, '../', 'public');

app.use(express.static(publicPath));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});
app.get('/productCart', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'views', 'productCart.html'))
});