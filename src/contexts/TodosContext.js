import React, { createContext, useState } from 'react';
import uuid from 'uuid/v1';

export const TodosContext = createContext();

const TodosContextProvider = props => {
	const [todos, setTodos] = useState([
		{
			title: 'Make portfolio',
			dateCreated: 'Feb 9, 2020',
			dateDone: '',
			status: false,
			id: 1,
		},
		{
			title: 'Learn web dev',
			dateCreated: 'Feb 8, 2020',
			dateDone: '',
			status: false,
			id: 2,
		},
		{
			title: 'TM website',
			dateCreated: 'Mar 5, 2020',
			dateDone: '',
			status: false,
			id: 3,
		},
		{
			title: 'React to-dos goals app',
			dateCreated: 'Mar 19, 2020',
			dateDone: '',
			status: false,
			id: 4,
		},
	]);
	const removeItem = id => {
		setTodos(todos.filter(todo => todo.id !== id));
	};
	const addItem = title => {
		setTodos([
			...todos,
			{ title, id: uuid(), status: false, dateCreated: new Date().getTime() },
		]);
	};
	const toggleItemStatus = id => {
		setTodos(
			todos.map(todo => {
				if (todo.id === id) {
					todo.status = !todo.status;
					todo.dateDone = new Date().getTime();
				}
				return todo;
			})
		);
	};
	return (
		<TodosContext.Provider
			value={{ todos, removeItem, addItem, toggleItemStatus }}
		>
			{props.children}
		</TodosContext.Provider>
	);
};

export default TodosContextProvider;
