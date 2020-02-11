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
1. If we run the program now it will say todos and removeTodo is not defined. That's because the TodosList component doesn't have access to the state and the function. So we have to create a context for the TodosList. A context is a state that can be accessed by all components without having to pass the state down as props through several comopnents in the component tree.
Create a file TodosContext.js in ./src/contexts folder. We will need createContext and useState methods. We will copy paste the state and removeTodo function from App.js into it.
    ```
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
2. Now we'll import TodosContextProvider into our App.js and wrap our jsx within it. Now all components within TodosContextProvider will have access to the context by simply importing it.
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
3. In TodosList.js import useContext and TodosContextProvider. Destructure the todos and removeTodo from the context.
    ```
    import React, { useContext } from 'react'
    import { TodosContext } from '../contexts/TodosContext'
    const TodosList = () => {
      const {todos, removeTodo} = useContext(TodosContext);
      ...
    ```
4. If you run the app now it will work but you'll see a warning saying each child in a list must have a unique key. So we'll install uuid package to create random ids. We'll assign those ids to each new

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
1. rename data property to datecreated. add property datedone.
2. add property status to say done or not done using boolean.
3. create donetodo function. make sure its added to todocontextprovider values. also it should be destructured in todolist.
4. add a done button to li with an onclick of donetodo().

next make done item go to seperate list
done item will get restore button. 