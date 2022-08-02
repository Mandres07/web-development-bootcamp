const express = require('express');
const path = require('path');
const defaultRoutes = require('./routes/default');
const restaurantsRoutes = require('./routes/restaurants');

const app = express();

// setting the dynamic html engine (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set the folder where all public accesible files are located
app.use(express.static('public'));
// parse the incoming body requests as json
app.use(express.urlencoded({ extended: false }));


// The Routes
app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);

// General 404 catch if no other route is met
app.use(function (_, res) {
   res.status(404).render('404');
});

// General server error catch
app.use(function (error, req, res, next) {
   res.status(500).render('500');
});

app.listen(3000);