const path = require('path');
const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const db = require('./data/database');
const sessionConfig = require('./config/session');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth-middleware');
const addCsrfToken = require('./middlewares/csrf-token-middleware');

const mongodbSessionStore = sessionConfig.createSessionStore(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongodbSessionStore)));
app.use(csrf());
app.use(addCsrfToken);
app.use(authMiddleware);

app.use(authRoutes);
app.use(blogRoutes);

app.use(function (_, _, res, _) {
   res.render('500');
})

db.connectToDatabase().then(function () {
   app.listen(3000);
});
