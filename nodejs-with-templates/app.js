const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// setting the dynamic html engine (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set the folder where all public accesible files are located
app.use(express.static('public'));
// parse the incoming body requests as json
app.use(express.urlencoded({ extended: false }));

// Example of returning a static html 
// app.get('/', function (req, res) {
//    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
//    res.sendFile(htmlFilePath);
// });

app.get('/', function (req, res) {
   res.render('index');
});

app.get('/about', function (req, res) {
   res.render('about');
});

app.get('/restaurants', function (req, res) {
   const filePath = path.join(__dirname, 'data', 'restaurants.json');
   const fileData = fs.readFileSync(filePath);
   const storedRestaurant = JSON.parse(fileData);
   res.render('restaurants', { restaurants: storedRestaurant });
});

app.get('/recommend', function (req, res) {
   res.render('recommend');
});

app.post('/recommend', function (req, res) {
   const restaurant = req.body;
   const filePath = path.join(__dirname, 'data', 'restaurants.json');
   const fileData = fs.readFileSync(filePath);
   const storedRestaurant = JSON.parse(fileData);
   storedRestaurant.push(restaurant);
   fs.writeFileSync(filePath, JSON.stringify(storedRestaurant));

   res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
   res.render('confirm');
});

app.listen(3000);