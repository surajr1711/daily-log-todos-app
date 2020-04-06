import React from 'react';
import './App.css';
import './variables.css';
// import TodosContextProvider from './contexts/TodosContext';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCheck, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import DailyLog from './pages/DailyLog';

// library.add( faCheck, faTimes, faRedo)

const App = () => {
	return (
		<>
			{/* <Header /> */}
			{/* <Navbar /> */}
			<DailyLog />
			{/* <Aside /> */}
		</>
	);
};

export default App;
