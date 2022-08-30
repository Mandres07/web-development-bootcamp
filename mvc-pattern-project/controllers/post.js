const Post = require('../models/post');
const sessionValidation = require('../util/validation-session');
const validation = require('../util/validation');

function getHome(req, res) {
   res.render('welcome');
}

async function getAdmin(req, res) {
   if (!res.locals.isAuth) {
      return res.status(401).render('401');
   }
   const posts = await Post.fetchAll();
   const sessionInputData = sessionValidation.getSessionErrorData(req, {
      title: '',
      content: ''
   });
   res.render('admin', {
      posts: posts,
      inputData: sessionInputData
   });
}

async function createPost(req, res) {
   const enteredTitle = req.body.title;
   const enteredContent = req.body.content;
   if (!validation.postIsValid(enteredTitle, enteredContent)) {
      sessionValidation.flashErrorsToSession(req, {
         message: 'Invalid input - please check your data.',
         title: enteredTitle,
         content: enteredContent,
      }, function () {
         res.redirect('/admin');
      })
      return;
   }
   const post = new Post(enteredTitle, enteredContent);
   await post.save();
   res.redirect('/admin');
}

async function getSinglePost(req, res, next) {
   let post;
   try {
      post = new Post(null, null, req.params.id);
   }
   catch (error) {
      return next(error);
   }
   await post.fetch();
   if (!post.title || !post.content || !post.id) {
      return res.render('404');
   }
   const sessionInputData = sessionValidation.getSessionErrorData(req, {
      title: post.title,
      content: post.content
   });
   res.render('single-post', {
      post: post,
      inputData: sessionInputData
   });
}

async function updatePost(req, res) {
   const enteredTitle = req.body.title;
   const enteredContent = req.body.content;
   if (!validation.postIsValid(enteredTitle, enteredContent)) {
      sessionValidation.flashErrorsToSession(req, {
         message: 'Invalid input - please check your data.',
         title: enteredTitle,
         content: enteredContent,
      }, function () {
         res.redirect(`/posts/${req.params.id}/edit`);
      })
      return;
   }
   const post = new Post(enteredTitle, enteredContent, req.params.id);
   await post.save();
   res.redirect('/admin');
}

async function deletePost(req, res) {
   const post = new Post(null, null, req.params.id);
   await post.delete();
   res.redirect('/admin');
}

module.exports = {
   getHome,
   getAdmin,
   createPost,
   getSinglePost,
   updatePost,
   deletePost
}