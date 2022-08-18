const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../data/database');

const storageConfig = multer.diskStorage({
   destination: function (_, _, callback) { // Folder location for uploading files
      callback(null, 'images');
   },
   filename: function (_, file, callback) {
      callback(null, Date.now() + '-' + file.originalname); // File uploaded name
   }
});
const upload = multer({ storage: storageConfig });

router.get('/', async function (_, res) {
   const users = await db.getDb().collection('users').find().toArray();
   res.render('profiles', { users });
});

router.get('/new-user', function (_, res) {
   res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function (req, res) {
   const uploadedFile = req.file;
   const userData = req.body;
   await db.getDb().collection('users').insertOne({
      name: userData.username,
      imagePath: uploadedFile.path
   });
   res.redirect('/');
});

module.exports = router;