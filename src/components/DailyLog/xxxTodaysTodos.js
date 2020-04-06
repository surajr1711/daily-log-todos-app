import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';

const TodaysTodos = () => {
	const [todos, setTodos] = useState([]);
	const [searchedTodo, setSearchedTodo] = useState('');

	onChangeHandler = () => {};

	return (
		<Form.Group controlId="todos">
			<Form.Label className="h2">
				2. What are the 6 most important things I can do today? What exactly do
				I want to get out of them?
			</Form.Label>
			<InputGroup>
				<Form.Control
					value={searchedTodo}
					onChange={onChangehandler}
					placeholder="Search for a todo here. Then click add."
				/>
				<InputGroup.Append>
					<Button variant="success">Add to-do</Button>
				</InputGroup.Append>
			</InputGroup>
			<Form.Text className="text-muted">
				Keep your attention on what's in front of you. Sequence them by what
				leads into what. The most important thing is to not waste time. That
				also means to rethink my plans. If my plans are taking too long then
				they need to change. Focus specifically on the actual objective, the end
				goal. How can you WIN today? What would that be? (5 mins)
			</Form.Text>
		</Form.Group>
	);
};

export default TodaysTodos;
