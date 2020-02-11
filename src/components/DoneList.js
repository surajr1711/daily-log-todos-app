import React, { useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext'
import ListItem from './ListItem';

const DoneList = () => {
  const {todos} = useContext(TodosContext);
  return (
    <ul>
      <h2>Done</h2>
      {todos.filter(todo => todo.status === true).map(todo => <ListItem todo={todo} key={todo.id}/>)}
    </ul>
  )
}

export default DoneList