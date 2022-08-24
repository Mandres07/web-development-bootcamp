const path = require('path');
const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session'); // mongodb session

const db = require('./data/database');
const demoRoutes = require('./routes/demo');
const { ObjectId } = require('mongodb');

const MongoDBStore = mongodbStore(session); // mongodb session

const app = express();
const sessionStore = new MongoDBStore({
   uri: 'mongodb://localhost:27017',
   databaseName: 'auth-demo',
   collection: 'sessions'
}); // mongodb session

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
   secret: 'super-secret',
   resave: false,
   saveUninitialized: false,
   store: sessionStore, // mongodb session
   // cookie: {
   //    maxAge: 30 * 24 * 60 * 60 * 1000
   // }
}));

app.use(async function (req, res, next) {
   const isAuth = req.session.isAuthenticated;
   const user = req.session.user;
   if (!user || !isAuth) {
      return next();
   }
   const userDoc = await db.getDb().collection('users').findOne({ _id: ObjectId(user.id) });
   const isAdmin = userDoc.isAdmin;

   // By default res.locals will be available on all templates
   res.locals.isAuth = isAuth;
   res.locals.isAdmin = isAdmin;

   next();
});
app.use(demoRoutes);

app.use(function (error, req, res, next) {
   res.render('500');
})

db.connectToDatabase().then(function () {
   app.listen(3000);
});
