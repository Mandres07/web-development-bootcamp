const TodosApp = {
   data() {
      return {
         isLoading: false,
         todos: [],
         enteredTodoText: '',
         editedTodoId: null
      };
   },
   mounted() { }, // WHEN THE DOM IS CONTROLLED ALREADY
   async created() {  // RIGHT BEFORE CONTROLLING THE DEOM
      let response;
      try {
         this.isLoading = true;
         response = await fetch('http://localhost:3000/todos');
         this.isLoading = false;
      } catch (error) {
         alert('Something went wrong!');
         return;
      }
      if (!response.ok) {
         alert('Something went wrong!');
         return;
      }
      const responseData = await response.json();
      this.todos = responseData.todos;
   },
   methods: {
      async saveTodo(event) {
         event.preventDefault();
         if (this.editedTodoId) {
            const todoId = this.editedTodoId;
            let response;
            try {
               response = await fetch('http://localhost:3000/todos/' + todoId, {
                  method: 'PATCH',
                  body: JSON.stringify({
                     newText: this.enteredTodoText,
                  }),
                  headers: {
                     'Content-Type': 'application/json',
                  },
               });
            } catch (error) {
               alert('Something went wrong!');
               return;
            }
            if (!response.ok) {
               alert('Something went wrong!');
               return;
            }
            const todoIndex = this.todos.findIndex(function (todoItem) {
               return todoItem.id === todoId;
            });
            const updatedTodoItem = {
               id: this.todos[todoIndex].id,
               text: this.enteredTodoText
            };
            this.todos[todoIndex] = updatedTodoItem;
            this.editedTodoId = null;
         } else {
            let response;
            try {
               response = await fetch('http://localhost:3000/todos', {
                  method: 'POST',
                  body: JSON.stringify({
                     text: this.enteredTodoText,
                  }),
                  headers: {
                     'Content-Type': 'application/json',
                  },
               });
            } catch (error) {
               alert('Something went wrong!');
               return;
            }
            if (!response.ok) {
               alert('Something went wrong!');
               return;
            }
            const responseData = await response.json();
            const newTodo = {
               text: this.enteredTodoText,
               id: responseData.createdTodo.id
            };
            this.todos.push(newTodo);
         }
         this.enteredTodoText = '';
      },
      startEditTodo(todoId) {
         this.editedTodoId = todoId;
         const todo = this.todos.find(function (todo) {
            return todo.id === todoId;
         });
         if (todo) {
            this.enteredTodoText = todo.text;
         }
      },
      async deleteTodo(todoId) {
         this.todos = this.todos.filter(function (todoItem) {
            return todoItem.id !== todoId;
         });
         let response;
         try {
            response = await fetch('http://localhost:3000/todos/' + todoId, {
               method: 'DELETE',
            });
         } catch (error) {
            alert('Something went wrong!');
            return;
         }
         if (!response.ok) {
            alert('Something went wrong!');
            return;
         }
      }
   }
};

Vue.createApp(TodosApp).mount('#todos-app');