import React, { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import ListItem from './ListItem';

const DoneList = () => {
	const { todos } = useContext(TodosContext);
	const doneItems = todos.filter(todo => todo.status === true);
	return (
		<ul>
			<h2>Done</h2>
			{doneItems.length === 0 ? (
				<p>Nothing done recently... </p>
			) : (
				doneItems.map(todo => <ListItem todo={todo} key={todo.id} />)
			)}
		</ul>
	);
};

export default DoneList;
