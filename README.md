# My Todos app

## Setup the basic app with delete item functionality

1. Make sure node is installed.
2. Create a project folder.
3. Open terminal inside folder and type npx create-react-app.
4. Do preliminary house-keeping. Delete css files and logos and empty app.js div as needed.
5. In app.js create a react arrow function component with export template. Use rafce abbr. You need ES7/react snippets extension by dsznajder.
6. Create a state for your todo items list.
   ```
   import React, {useState} from 'react;
   const App = () => {
     const [todos] = useState([
       {
         title: "Make portfolio",
         date: "Feb 9, 2020",
         id: 1
       },
       {
         title: "Learn web dev",
         date: "Feb 8, 2020",
         id: 2
       }
     ]);
     ...
   }
   ```
7. Display the state in the component's return function.
   ```
   const App = () => {
     ...
     return (
       <div className="app">
         <ul>
           {todos.map(todo => {return(
             <li>
               <span>{todo.title}</span><br/>
               <small>{todo.date}</small><br/>
               <button></button>
             </li>
           );})}
         </ul>
       </div>
     );
   }
   ```
8. Create an onClick event-handler removeTodo() for the button. Then create the event-handler function. To update the state you need to use the setState method in the useState destructure.
   ```
   const App = () => {
   const [todos, setTodos] = useState([
   ...
   const removeTodo = (id) => {
       setTodos(todos.filter(todo => todo.id !== id));
     }
   return (
     <div className="app">
       <ul>
         {todos.map(todo => {return(
           <li>
             <span>{todo.title}</span><br/>
             <small>{todo.date}</small><br/>
             <button onClick={() => removeTodo(todo.id)}>X</button>
           </li>
         );})}
       </ul>
     ...
   ```

## Export the ul as seperate component

If we add the form in this same app.js, then the file will get very long. So first let's seperate our ul related code and state into their own files.

1. Create a new component called TodosList for the ul list of todos in a ./src/components/ folder. Copy-paste the ul's jsx code from App.js into TodosList.js.
   ```
   import React from 'react'
   const TodosList = () => {
     return (
       <ul>
         {todos.map(todo => {return(
           <li key={todo.id}>
             <span>{todo.title}</span><br/>
             <small>{todo.date}</small><br/>
             <button onClick={() => removeTodo(todo.id)}>X</button>
           </li>
         );})}
       </ul>
     )
   }
   export default TodosList
   ```
2. Import the new TodosList component into App.js and add the component to our app.

   ```
   import TodosList from './components/TodosList';
   const App = () => {
     ...
     return (
       ...
       <TodosList />
     ...
   export default App;

   ```

## Export the state as a context

1.  If we run the program now it will say todos and removeTodo is not defined. That's because the TodosList component doesn't have access to the state and the function. So we have to create a context for the TodosList. A context is a state that can be accessed by all components without having to pass the state down as props through several comopnents in the component tree.
    Create a file TodosContext.js in ./src/contexts folder. We will need createContext and useState methods. We will copy paste the state and removeTodo function from App.js into it.

    ````
    import React, { createContext, useState } from 'react'

        export const TodosContext = createContext();

        const TodosContextProvider = (props) => {
          const [todos, setTodos] = useState([
            {
              title: "Make portfolio",
              date: "Feb 9, 2020",
              id: 1
            },
            {
              title: "Learn web dev",
              date: "Feb 8, 2020",
              id: 2
            }
          ]);
          const removeTodo = (id) => {
            setTodos(todos.filter(todo => todo.id !== id));
          }
          return (
            <TodosContext.Provider value={{todos, removeTodo}}>
              {props.children}
            </TodosContext.Provider>
          )
        }

        export default TodosContextProvider;
        ```

    ````

2.  Now we'll import TodosContextProvider into our App.js and wrap our jsx within it. Now all components within TodosContextProvider will have access to the context by simply importing it.

    ```
    import React from 'react';
    import TodosContextProvider from './contexts/TodosContext';
    import TodosList from './components/TodosList';

    const App = () => {
      return (
        <div>
          <TodosContextProvider>
            <h1>Todos app</h1>
            <TodosList />
          </TodosContextProvider>
        </div>
      );
    }

    export default App;
    ```

3.  In TodosList.js import useContext and TodosContextProvider. Destructure the todos and removeTodo from the context.
    ```
    import React, { useContext } from 'react'
    import { TodosContext } from '../contexts/TodosContext'
    const TodosList = () => {
      const {todos, removeTodo} = useContext(TodosContext);
      ...
    ```
4.  If you run the app now it will work but you'll see a warning saying each child in a list must have a unique key. So we'll install uuid package to create random ids. We'll assign those ids to each new

## Create a form component to add items

1. Create a new file TodoForm.js in ./src/components folder.

   ```
   import React from 'react'

   const TodoForm = () => {
     return (
       <form>
         <input type="text"/>
         <button type="submit">Submit</button>
       </form>
     )
   }

   export default TodoForm
   ```

2. Import the form component into App.js

   ```
   ...
   import TodoForm from './components/TodoForm';

   const App = () => {
     ...
           <TodoForm />
           <TodoList />
     ...
   ```

3. Create a local state for the TodoForm to save the input field onChange. Create a form submit handler.

   ```
   import React, { useState } from 'react'

   const TodoForm = () => {
     const [title, setTitle] = useState('');
     const handleSubmit = e => {
       e.preventDefault();
       console.log(title);
       setTitle('');
     }
     return (
       <form onSubmit={handleSubmit}>
         <input type="text" onChange={e => setTitle(e.target.value)} placeholder="New item..." value={title} required/>
         <button type="submit">Submit</button>
       </form>
     )
   }
   export default TodoForm
   ```

4. Create an addTodo function in the TodosContext so that we can use it in the TodoForm to add a new item. We'll also need to install the uuid package to generate a random id for each new item. Remember to npm install uuid.

   ```
   import React, { createContext, useState } from 'react'
   import uuid from 'uuid/v1';
   import date from '../utils/date'

   export const TodosContext = createContext();

   const TodosContextProvider = (props) => {
     ...
     const addTodo = (title) => {
       setTodos([...todos, {title, id: uuid(), date: new Date().getTime()}]);
     }
     return (
       <TodosContext.Provider value={{todos, removeTodo, addTodo}}>
         {props.children}
       </TodosContext.Provider>
     ...
   ```

## Add 'mark as done' functionality

1. To add the mark as done functionality we want add a couple of features to our app. So in TodosContext.js let's add the following.

   1. We want to add a dateDone property to get the time when we complete a task.
   2. So we will also rename the date property to dateCreated.
   3. We want a status property as boolean to say whether the task is done or not.

   ```
   ...
   const TodosContextProvider = (props) => {
     const [todos, setTodos] = useState([
       {
         title: "Make portfolio",
         dateCreated: "Feb 9, 2020",
         dateDone: "",
         status: false,
         id: 1
       },
       {
         title: "Learn web dev",
         dateCreated: "Feb 8, 2020",
         dateDone: "",
         status: false,
         id: 2
       }
     ]);
   ...
   ```

2. Create a doneTodo function in the context to update the "Done" todo. It should update the dateDone and status properties of the item. Make sure doneTodo function is added to TodoContext.Provider values.
   ```
   const doneTodo = id => {
   setTodos(todos.map(todo => {
     if(todo.id === id) {
       todo.status = !todo.status;
       todo.dateDone = new Date().getTime();
     }
     return todo;
   }));
   }
   ```
3. Add a 'Done' button to li in TodoList.js with an onclick of donetodo(). Remember doneTodo has to be be destructured from usecontext(TodosContext).

   ```
   ...
   const TodoList = () => {
     const {todos, removeTodo, doneTodo} = useContext(TodosContext);
     return (
       <ul>
         {
           todos.map(todo => {
             return(
             <li key={todo.id}>
               <button onClick={() => doneTodo(todo.id)}>Done</button>
               <span>{todo.title} </span>
               ...
   ```

4. Next we want to make done items go to a seperate list. We would need 2 lists to do this which will each contain list items with the same code. So to keep our code DRY (Don't repeat yourself), we'll extract the <li> code into its seperate component ListItem.js.

   ```
   import React, { useContext } from 'react'
   import { TodosContext } from '../contexts/TodosContext'

   const ListItem = ({todo}) => {
     const {removeTodo, doneTodo} = useContext(TodosContext);
     return (
       <li>
         <button onClick={() => doneTodo(todo.id)}>Done</button>
         <span>{todo.title} </span>
         <small>{todo.dateCreated} </small>
         <small>{todo.status ? "true" : "false"} </small>
         <small>{todo.dateDone} </small>
         <button onClick={() => removeTodo(todo.id)}>x</button>
       </li>
     )
   }

   export default ListItem

   ```

5. Now let's create another component called DoneList. We'll copy paste all of TodoList.js into a DoneList.js. We'll only change the component name to DoneList and export the same. Then we'll import DoneList into App.js.

   ```
   import React from 'react';
   import TodosContextProvider from './contexts/TodosContext';
   import TodoList from './components/TodoList';
   import TodoForm from './components/TodoForm';
   import DoneList from './components/DoneList';

   const App = () => {
     return (
       <div>
         <TodosContextProvider>
           <h1>Todos app</h1>
           <TodoForm />
           <TodoList />
           <DoneList />
         </TodosContextProvider>
       </div>
     );
   }

   export default App;
   ```

6. If we check out our app now you'll find everything is working but now we have 2 lists with the same items. So for each list we need to filter these items depending on the status property. Here's the return function of TodoList. Its the same code for DoneList except that the filter will be todo.status === true.
   ```
   const TodoList = () => {
     const {todos} = useContext(TodosContext);
     return (
       <ul>
         <h2>Todos</h2>
         {todos.filter(todo => todo.status === false).map(todo => <ListItem todo={todo} key={todo.id}/>)}
       </ul>
     )
   }
   ```

## Add undo item functionality

1. For this we do not need to create a new function in our context since our toggleItemStatus function does that already. We can however customize our Listitem component differently depending on the item status it gets. Instead of the done button we'll reaplce it with an undo button. And instead of span we can use del.

   ```
   const ListItem = ({todo}) => {
     const {removeItem, toggleItemStatus} = useContext(TodosContext);
     return (
       <li>
         <button onClick={() => toggleItemStatus(todo.id)}>
           {todo.status ? "Undo" : "Done"}
         </button>
         {
         todo.status
           ? <del>{todo.title} </del>
           :	<span>{todo.title} </span>
         }
         <small>{todo.dateCreated} </small>
         <small>{todo.status ? "true" : "false"} </small>
         <small>{todo.dateDone} </small>
         <button onClick={() => removeItem(todo.id)}>x</button>
       </li>
     )
   }
   ```

### Future features

1. drag drop to arrange items in order.
2. sort alphabetically by date created.
3. make subgoal or promote
