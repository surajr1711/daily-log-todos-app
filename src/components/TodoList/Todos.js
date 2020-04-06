import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import DoneList from './DoneList';

const Todos = () => {
	return (
		<>
			<TodoForm />
			<TodoList />
			<DoneList />
		</>
	);
};

export default Todos;
