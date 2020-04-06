import React from 'react';

import Input from './Input';
import './Question.css';

const Question = props => {
	return (
		<div className="form__group">
			{props.question && (
				<label className="form__label">
					<h2>{props.question}</h2>
				</label>
			)}

			<small className="form__description">{props.description}</small>

			<Input
				id={props.id}
				element={props.element}
				type={props.type}
				placeholder={props.placeholder}
				onInput={props.onInput}
			/>
		</div>
	);
};

export default Question;
