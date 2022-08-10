const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', function (_, res) {
   res.redirect('/posts');
});

router.get('/posts', async function (_, res) {
   const query = `
   SELECT a.*, b.name as author_name FROM posts a 
   INNER JOIN authors b on a.author_id = b.id
   `;
   const [posts] = await db.query(query);
   res.render('posts-list', { posts });
});

router.get('/new-post', async function (_, res) {
   const [authors] = await db.query('SELECT * FROM authors');
   res.render('create-post', { authors });
});

router.post('/new-post', async function (req, res) {
   const params = [
      req.body.title,
      req.body.summary,
      req.body.content,
      req.body.author
   ];
   await db.query(
      'INSERT INTO posts (title, summary, body, author_id) VALUES (?)',
      [params]
   );
   res.redirect('/posts');
});

router.get('/posts/:id', async function (req, res) {
   const query = `
   SELECT a.*, b.name as author_name, b.email as author_email FROM posts a 
   INNER JOIN authors b on a.author_id = b.id
   WHERE a.id = ?
   `;
   const [posts] = await db.query(query, [req.params.id]);

   if (!posts || posts.length === 0) {
      return res.status(404).render('404');
   }

   const postData = {
      ...posts[0],
      date: posts[0].date.toISOString(),
      humanDate: posts[0].date.toLocaleDateString('en-US', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      })
   };
   res.render('post-detail', { post: postData });
});

router.get('/posts/:id/edit', async function (req, res) {
   const query = `
   SELECT * FROM posts WHERE id = ?
   `;
   const [posts] = await db.query(query, [req.params.id]);

   if (!posts || posts.length === 0) {
      return res.status(404).render('404');
   }

   res.render('update-post', { post: posts[0] });
});

router.post('/posts/:id/edit', async function (req, res) {
   const query = `
   UPDATE posts SET title = ?, summary = ?, body = ?
   WHERE id = ?
   `;
   await db.query(query, [req.body.title, req.body.summary, req.body.content, req.params.id]);

   res.redirect('/posts');
});

router.post('/posts/:id/delete', async function (req, res) {
   const query = `
   DELETE FROM posts
   WHERE id = ?
   `;
   await db.query(query, [req.params.id]);
   res.redirect('/posts');
});

module.exports = router;