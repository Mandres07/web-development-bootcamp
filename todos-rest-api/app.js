const express = require('express');
const todosRoutes = require('./routes/todos.routes');
const db = require('./data/database');
const enableCors = require('./middlewares/cors');

const app = express();

app.use(enableCors);
app.use(express.json());

app.use('/todos', todosRoutes);

app.use(function (error, req, res, next) {
   res.status(500).json({
      message: 'Something went wrong!',
   });
});

db.initDb()
   .then(function () {
      app.listen(3000);
   })
   .catch(function (error) {
      console.log('Connecting to the database failed!');
   });
