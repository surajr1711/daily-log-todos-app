import React from 'react';
import TodosContextProvider from './contexts/TodosContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';

library.add( faCheck, faTimes, faRedo)

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
