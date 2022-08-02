const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

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
   const storedRestaurants = JSON.parse(fileData);
   res.render('restaurants', { restaurants: storedRestaurants });
});

app.get('/restaurants/:id', function(req, res) {
   const restaurantId = req.params.id;
   const filePath = path.join(__dirname, 'data', 'restaurants.json');
   const fileData = fs.readFileSync(filePath);
   const storedRestaurants = JSON.parse(fileData);
   const restaurant = storedRestaurants.find(x => x.id === restaurantId);
   if(!restaurant){
      return res.render('404');
   }
   res.render('restaurant-details', {restaurant});
});

app.get('/recommend', function (req, res) {
   res.render('recommend');
});

app.post('/recommend', function (req, res) {
   const restaurant = {...req.body, id: uuid.v4() };
   const filePath = path.join(__dirname, 'data', 'restaurants.json');
   const fileData = fs.readFileSync(filePath);
   const storedRestaurants = JSON.parse(fileData);
   storedRestaurants.push(restaurant);
   fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
   res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
   res.render('confirm');
});

// General 404 catch if no other route is meet
app.use(function(req, res){
   res.render('404');
});

app.listen(3000);