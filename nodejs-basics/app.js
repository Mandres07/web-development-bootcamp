const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/currenttime', function (_, res) {
   res.send('<h1>' + new Date().toISOString() + '</h1>');
});

app.post('/store-user', function (req, res) {
   const username = req.body.username;
   const filePath = path.join(__dirname, 'data', 'users.json');
   const fileData = fs.readFileSync(filePath);
   const existingUsers = JSON.parse(fileData);
   existingUsers.push(username);
   fs.writeFileSync(filePath, JSON.stringify(existingUsers));
   res.send('<h1>Username stored succesfully!</h1>');
});

app.get('/users', function (_, res) {
   const filePath = path.join(__dirname, 'data', 'users.json');
   const fileData = fs.readFileSync(filePath);
   const existingUsers = JSON.parse(fileData);

   let responseData = '<ul>';
   for (const user of existingUsers) {
      responseData += `<li>${user}</li>`;
   }
   responseData += '</ul>';

   res.send(responseData);
})

app.get('/', function (_, res) {
   res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
});

app.listen(3000);