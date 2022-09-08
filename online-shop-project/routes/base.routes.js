const express = require('express');

const router = express.Router();

router.get('/', function (_, res) {
   res.redirect('/products');
});

router.get('/401', function (_, res) {
   res.status(401).render('shared/401');
});

router.get('/403', function (_, res) {
   res.status(403).render('shared/403');
});

module.exports = router;