import React, { useReducer, useEffect } from 'react';

import './Input.css';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
			};
		default:
			return state;
	}
};

const Input = props => {
	const [inputState, dispatch] = useReducer(inputReducer, { value: '' });

	const { id, onInput } = props;
	const { value } = inputState;

	useEffect(() => {
		onInput(id, value);
	}, [id, onInput, value]);

	const onChangeHandler = event => {
		dispatch({ type: 'CHANGE', val: event.target.value });
	};

	// check if question type is for input or textarea
	const element =
		props.element === 'input' ? (
			<input
				className="form__field"
				type={props.type}
				value={inputState.value}
				placeholder={props.placeholder}
				onChange={onChangeHandler}
			/>
		) : (
			<textarea
				className="form__field"
				rows="1"
				value={inputState.value}
				placeholder={props.placeholder}
				onChange={onChangeHandler}
			/>
		);

	return <>{element}</>;
};

export default Input;
