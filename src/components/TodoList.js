import React, { useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext'

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
            <small>{todo.dateCreated} </small>
            <small>{todo.status ? "true" : "false"} </small>
            <small>{todo.dateDone} </small>
            <button onClick={() => removeTodo(todo.id)}>x</button>
          </li>
          );
        })
      }
    </ul>
  )
}

export default TodoList