import React from 'react';
import TodosContextProvider from './contexts/TodosContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  return (
    <div>
      <TodosContextProvider>
        <h1>Todos app</h1>
        <TodoForm />
        <TodoList />
      </TodosContextProvider>
    </div>
  );
}

export default App;
