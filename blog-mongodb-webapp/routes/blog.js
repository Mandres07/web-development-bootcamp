const express = require('express');
const router = express.Router();
const db = require('../data/database');
const { ObjectId } = require('mongodb');

router.get('/', function (_, res) {
   res.redirect('/posts');
});

router.get('/posts', async function (_, res) {
   const posts = await db
      .getDb()
      .collection('posts')
      .find()
      .project({ title: 1, summary: 1, 'author.name': 1 })
      .toArray();
   res.render('posts-list', { posts });
});

router.post('/posts', async function (req, res) {
   const authorId = new ObjectId(req.body.author)
   const author = await db.getDb().collection('authors').findOne({ _id: authorId });
   const newPost = {
      title: req.body.title,
      summary: req.body.summary,
      body: req.body.content,
      date: new Date(),
      author: {
         id: authorId,
         name: author.name,
         email: author.email
      }
   };
   await db.getDb().collection('posts').insertOne(newPost);
   res.redirect('posts');
});

router.get('/new-post', async function (_, res) {
   const authors = await db.getDb().collection('authors').find().toArray();
   res.render('create-post', { authors });
});

router.get('/posts/:id', async function (req, res, next) {
   let postId = req.params.id;

   try {
      postId = new ObjectId(postId);
   }
   catch (error) {
      return next(error);
   }
   const post = await db
      .getDb()
      .collection('posts')
      .findOne({ _id: postId }, { projection: { summary: 0 } });

   if (!post) {
      return res.status(404).render('404');
   }
   post.humanDate = post.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   });
   post.date = post.date.toISOString();
   res.render('post-detail', { post });
});

router.get('/posts/:id/edit', async function (req, res) {
   const postId = req.params.id;
   const post = await db
      .getDb()
      .collection('posts')
      .findOne({ _id: new ObjectId(postId) }, { projection: { author: 0, date: 0 } });
   if (!post) {
      return res.status(404).render('404');
   }
   res.render('update-post', { post });
});

router.post('/posts/:id/edit', async function (req, res) {
   const postId = new ObjectId(req.params.id);
   await db.getDb().collection('posts').updateOne({ _id: postId }, {
      $set: {
         title: req.body.title,
         summary: req.body.summary,
         body: req.body.content,
         date: new Date()
      }
   });
   res.redirect('/posts');
});

router.post('/posts/:id/delete', async function (req, res) {
   const postId = new ObjectId(req.params.id);
   await db.getDb().collection('posts').deleteOne({ _id: postId });
   res.redirect('/posts');
});

module.exports = router;