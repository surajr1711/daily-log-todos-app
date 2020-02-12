import React, { useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ListItem = ({todo}) => {
	const {removeItem, toggleItemStatus} = useContext(TodosContext);
	return (
		<li>
			<button onClick={() => toggleItemStatus(todo.id)}>
				{
					todo.status 
					? <FontAwesomeIcon icon="redo" />
					: <FontAwesomeIcon icon="check" />
				}
			</button>
			{
			todo.status 
				? <del>{todo.title} </del>
				:	<span>{todo.title} </span>
			}
			<small>{todo.dateCreated} </small>
			<small>{todo.status ? "true" : "false"} </small>
			<small>{todo.dateDone} </small>
			<button onClick={() => removeItem(todo.id)}>
				<FontAwesomeIcon icon="times" />
			</button>
		</li>
	)
}

export default ListItem
