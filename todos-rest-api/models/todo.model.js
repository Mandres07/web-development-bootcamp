const db = require('../data/database');
const mongodb = require('mongodb');

class Todo {
   constructor(text, id) {
      this.text = text;
      this.id = id;
   }

   static async getTodos() {
      const todoDocuments = await db.getDb().collection('todos').find().toArray();
      return todoDocuments.map(function (document) {
         return new Todo(document.text, document._id.toString());
      });
   }

   save() {
      if (this.id) {
         // try {
         const todoId = new mongodb.ObjectId(this.id);
         return db.getDb().collection('todos').updateOne(
            { _id: todoId },
            { $set: { text: this.text } }
         );
         // } catch (error) {
         //    throw new Error(error.message);
         // }
      }
      return db.getDb().collection('todos').insertOne({ text: this.text });
   }

   delete() {
      if (!this.id) {
         throw new Error('Trying to delete todo without id.');
      }
      const todoId = new mongodb.ObjectId(this.id);
      return db.getDb().collection('todos').deleteOne({ _id: todoId });
   }
}

module.exports = Todo;