import React from 'react';
import logo from './logo.svg';
import './App.css';

var App = () => {
	const sendData = () => {

	}
	return (
	<div className="App">
		<h1>Mood logger</h1>
		<div>
			<form>
				<label for="activtity">Activity</label>
				<input type="text" name="activity" />
				<label for="emotions">Emotions</label>
				<input type="text" name="emotions" />
				<label for="time">Time</label>
				<input type="date" name="time-date" />
				<input type="time" name="time" />
				<label for="depression_intensity">Depression Intensity</label>
				<input type="number" name="depression_intensity" />
				<input type="submit" value="Submit" />
			</form>
		</div>
	</div>
	);
}

export default App;
