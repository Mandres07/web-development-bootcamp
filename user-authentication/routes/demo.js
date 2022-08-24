const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/database');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.get('/', function (req, res) {
   res.render('welcome');
});

router.get('/signup', function (req, res) {
   let sessionInputData = req.session.inputData;
   if (!sessionInputData) {
      sessionInputData = {
         hasError: false,
         email: '',
         confirmEmail: '',
         password: ''
      };
   }
   req.session.inputData = null;
   res.render('signup', { inputData: sessionInputData });
});

router.get('/login', function (req, res) {
   let sessionInputData = req.session.inputData;
   if (!sessionInputData) {
      sessionInputData = {
         hasError: false,
         email: '',
         password: ''
      };
   }
   req.session.inputData = null;
   res.render('login', { inputData: sessionInputData });
});

router.post('/signup', async function (req, res) {
   const userData = req.body;
   const email = userData.email.trim();
   const confirmEmail = userData['confirm-email'].trim();
   const password = userData.password.trim();

   if (!email ||
      !confirmEmail ||
      !password ||
      password < 6 ||
      email !== confirmEmail ||
      !email.includes('@')) {
      req.session.inputData = {
         hasError: true,
         message: 'Invalid input - please check your data',
         email: email,
         confirmEmail: confirmEmail,
         password: password
      };
      req.session.save(function () {
         res.redirect('/signup');
      });
      return;
   }

   const existingUser = await db.getDb().collection('users').findOne({ email: email });
   if (existingUser) {
      req.session.inputData = {
         hasError: true,
         message: 'The provided email is taken',
         email: email,
         confirmEmail: confirmEmail,
         password: password
      };
      req.session.save(function () {
         res.redirect('/signup');
      });
      return;
   }

   const hashedPassword = await bcrypt.hash(password, 12);
   const user = {
      email,
      password: hashedPassword
   };
   await db.getDb().collection('users').insertOne(user);
   res.redirect('/login');
});

router.post('/login', async function (req, res) {
   const userData = req.body;
   const email = userData.email;
   const password = userData.password;
   const existingUser = await db.getDb().collection('users').findOne({ email: email });
   if (!existingUser) {
      req.session.inputData = {
         hasError: true,
         message: 'Could not log you in - please check your credentials',
         email: email,
         password: password
      };
      req.session.save(function () {
         res.redirect('/login');
      });
      return;
   }
   const passwordEqual = await bcrypt.compare(password, existingUser.password);
   if (!passwordEqual) {
      req.session.inputData = {
         hasError: true,
         message: 'Could not log you in - please check your credentials',
         email: email,
         password: password
      };
      req.session.save(function () {
         res.redirect('/login');
      });
      return;
   }
   req.session.user = { id: existingUser._id, email: existingUser.email };
   req.session.isAuthenticated = true;
   req.session.save(function () {
      res.redirect('/profile');
   });
});

router.get('/admin', async function (_, res) {
   if (!res.locals.isAuth) {
      return res.status(401).render('401');
   }
   if (!res.locals.isAdmin) {
      return res.status(403).render('403');
   }
   res.render('admin');
});

router.get('/profile', function (_, res) {
   if (!res.locals.isAuth) {
      return res.status(401).render('401');
   }
   res.render('profile');
});

router.post('/logout', function (req, res) {
   req.session.user = null;
   req.session.isAuthenticated = false;
   // console.log(req.session); // The entiew cookie
   // console.log(req.sessionID); // The cookie sessionID
   res.redirect('/');
});

module.exports = router;
