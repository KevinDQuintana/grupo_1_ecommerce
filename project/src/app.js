const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const sessionCookie = require(path.join(__dirname, 'middlewares', 'sessionCookie'));
const sessionMiddleware = require(path.join(__dirname, 'middlewares', 'session'));

const PORT = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '../', 'public');

const app = express();

/* cookie-parser */
app.use(cookieParser('secret-code'));
/* end */

/* express-session */
app.use(session({
	secret: 'GAME ON! Componentes de PC',
	resave: false,
	saveUninitialized: false,
}));
/* end */

app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* cookie middleware */
app.use(sessionCookie);
/* end */

/* session middleware */
app.use(sessionMiddleware);
/* end */

const ruteIndex = require(path.join(__dirname, 'routes', 'index'));
const ruteUsers = require(path.join(__dirname, 'routes', 'users'));
const ruteProducts = require(path.join(__dirname, 'routes', 'products'));
const ruteProductCart = require(path.join(__dirname, 'routes', 'productCart'));

app.use('/', ruteIndex);
app.use('/users', ruteUsers); // Nueva ruta '/users'
app.use('/products', ruteProducts); // Nueva ruta '/products'
app.use('/productCart', ruteProductCart);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
