const express = require('express');
const uuid = require('uuid');
const { getStoredRestaurants, saveRestaurants } = require('../utils/restaurants-data');

const router = express.Router();

router.get('/restaurants', function (req, res) {
   let order = req.query.order;
   let nextOrder = 'desc';
   if(order !== 'asc' && order !== 'desc'){
      order = 'asc';
   }
   if(order === 'desc'){
      nextOrder = 'asc';
   }
   const storedRestaurants = getStoredRestaurants();
   storedRestaurants.sort(function(resA, resB){
      if((order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name)){
         return 1;
      } 
      return -1;
   });
   res.render('restaurants', { restaurants: storedRestaurants, nextOrder });
});

router.get('/restaurants/:id', function (req, res) {
   const restaurantId = req.params.id;
   const storedRestaurants = getStoredRestaurants();
   const restaurant = storedRestaurants.find(x => x.id === restaurantId);
   if (!restaurant) {
      return res.status(404).render('404');
   }
   res.render('restaurant-details', { restaurant });
});

router.get('/recommend', function (_, res) {
   res.render('recommend');
});

router.post('/recommend', function (req, res) {
   const restaurant = { ...req.body, id: uuid.v4() };
   const restaurants = getStoredRestaurants();
   restaurants.push(restaurant);
   saveRestaurants();
   res.redirect('/confirm');
});

router.get('/confirm', function (_, res) {
   res.render('confirm');
});

module.exports = router;