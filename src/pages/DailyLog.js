import React, { useState, useCallback } from 'react';

import Question from '../components/FormElements/Question';
import questionData from '../components/DailyLog/questionData';
import './DailyLog.css';

const DailyLog = () => {
	const [formState, setFormState] = useState();

	const onInputHandler = useCallback(
		(inputId, inputValue) => {
			setFormState({
				...formState,
				[inputId]: inputValue,
			});
		},
		[formState]
	);

	return (
		<main className="container">
			<form action="" className="form">
				<Question
					id="title"
					element="input"
					type="text"
					placeholder="Day, date, calendar scheme"
					onInput={onInputHandler}
				/>

				<Question
					id="focus"
					question={questionData.focusQuestion}
					description={questionData.focusDescription}
					element="textarea"
					placeholder="This month's focus is... This week's focus is..."
					onInput={onInputHandler}
				/>
			</form>
		</main>
	);
};

export default DailyLog;
