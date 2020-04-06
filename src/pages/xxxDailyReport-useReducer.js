import React, { useCallback, useReducer } from 'react';

import Question from '../components/FormElements/Question';
// import dummyDailyData from '../components/DailyReport/dummyDailyData';
import questionData from '../components/DailyReport/questionData';
import './DailyReport.css';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			return {
				...state,
				[action.inputId]: action.value,
			};
		default:
			return state;
	}
};

const DailyLog = () => {
	const [formState, dispatch] = useReducer(formReducer, {
		title: '',
		focus: '',
	});

	const onInputHandler = useCallback(
		(id, value) => {
			dispatch({ type: 'INPUT_CHANGE', inputId: id, value });
			console.log(formState);
		},
		[formState]
	);

	return (
		<main className="container">
			<form action="" className="form">
				<Question
					id="title" // to update the corresponding state property
					// value={formState.title}
					element="input"
					type="text"
					placeholder="Day, date, calendar scheme"
					onInput={onInputHandler}
				/>

				<Question
					id="focus"
					// value={formState.focus}
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
