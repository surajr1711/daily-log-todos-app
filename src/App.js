import React from 'react';
import TodosContextProvider from './contexts/TodosContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
// import Lists from './components/Lists';


const App = () => {
  return (
    <div>
      <TodosContextProvider>
        <h1>Todos app</h1>
        <TodoForm />
        <TodoList />
        <DoneList />
        {/* <Lists /> */}
      </TodosContextProvider>
    </div>
  );
}

export default App;
