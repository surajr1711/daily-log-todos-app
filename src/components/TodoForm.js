import React, { useState, useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext';

const TodoForm = () => {
  const {addTodo} = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    addTodo(title);
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
