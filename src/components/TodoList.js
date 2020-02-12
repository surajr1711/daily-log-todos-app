import React, { useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext'
import ListItem from './ListItem';

const TodoList = () => {
  const {todos} = useContext(TodosContext);
  let todoItems = todos.filter(todo => todo.status === false)
  return (
    <ul>
      <h2>Todos</h2>
      {
        todoItems.length === 0
        ? <p>No todos. Add some...</p>
        : todoItems.map(todo => <ListItem todo={todo} key={todo.id}/>)
      }
    </ul>
  )
}

export default TodoList