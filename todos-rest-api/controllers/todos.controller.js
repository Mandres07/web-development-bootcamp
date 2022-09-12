const Todo = require('../models/todo.model');

async function getAllTodos(req, res, next) {
   try {
      const todos = await Todo.getTodos();
      res.json({
         todos: todos
      });
   } catch (error) {
      return next(error);
   }
}

async function addTodo(req, res, next) {
   const todoText = req.body.text;
   const todo = new Todo(todoText);
   let insertedId;
   try {
      const result = await todo.save();
      insertedId = result.insertedId;
   } catch (error) {
      return next(error);
   }
   todo.id = insertedId.toString();
   res.json({
      message: 'Added todo successfully!',
      createdTodo: todo
   });
}

async function updateTodo(req, res, next) {
   const todoId = req.params.id;
   const newTodoText = req.body.newText;
   const todo = new Todo(newTodoText, todoId);
   try {
      await todo.save();
   } catch (error) {
      return next(error);
   }
   res.json({
      message: 'Todo updated',
      updatedTodo: todo
   });
}

async function deleteTodo(req, res, next) {
   const todoId = req.params.id;
   const todo = new Todo(null, todoId);
   try {
      await todo.delete();
   } catch (error) {
      return next(error);
   }
   res.json({
      message: 'Todo deleted'
   });
}

module.exports = {
   getAllTodos,
   addTodo,
   updateTodo,
   deleteTodo
}