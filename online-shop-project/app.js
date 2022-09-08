const express = require('express');
const csrf = require('csurf');
const createSessionConfig = require('./config/session');
const expressSession = require('express-session');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthMiddleware = require('./middlewares/check-auth');
const protectedRoute = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const notFoundHandler = require('./middlewares/not-found');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const db = require('./data/database');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig))
app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(checkAuthMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', protectedRoute, ordersRoutes);
app.use('/admin', protectedRoute, adminRoutes);
app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function () {
   app.listen(3000);
}).catch(function (error) {
   console.log('Failed to connect to the database!');
   console.log(error);
});