const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants() {
   const fileData = fs.readFileSync(filePath);
   const storedRestaurants = JSON.parse(fileData);
   return storedRestaurants;
}

function saveRestaurants(restaurants) {
   fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

module.exports = {
   getStoredRestaurants,
   saveRestaurants
}