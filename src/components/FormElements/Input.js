import React, { useState, useEffect } from 'react';

import './Input.css';

const Input = props => {
	const [inputState, setInputState] = useState();

	const { id, onInput } = props;

	useEffect(() => {
		onInput(id, inputState);
	}, [id, onInput, inputState]);

	const onChangeHandler = event => {
		setInputState(event.target.value);
	};

	// check if question element type is for input or textarea
	const element =
		props.element === 'input' ? (
			<input
				id={props.id}
				className="form__field"
				type={props.type}
				value={inputState}
				placeholder={props.placeholder}
				onChange={onChangeHandler}
			/>
		) : (
			<textarea
				id={props.id}
				className="form__field"
				rows="1"
				value={inputState}
				placeholder={props.placeholder}
				onChange={onChangeHandler}
			/>
		);

	return <>{element}</>;
};

export default Input;
