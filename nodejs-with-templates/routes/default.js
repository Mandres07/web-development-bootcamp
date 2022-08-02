const express = require('express');
const router = express.Router();

// Example of returning a static html 
// app.get('/', function (req, res) {
//    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
//    res.sendFile(htmlFilePath);
// });

router.get('/', function (_, res) {
   res.render('index');
});

router.get('/about', function (_, res) {
   res.render('about');
});

module.exports = router;
