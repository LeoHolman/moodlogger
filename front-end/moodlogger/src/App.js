import React, {useState, useEffect} from 'react';
import './App.css';

var App = () => {
	const [activity, setActivity] = useState("");
	const [emotions, setEmotions] = useState([]);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [depressionIntensity, setDepressionIntensity] = useState("");
	const [emotionsList, setEmotionsList] = useState([]);

	async function sendData(data){
		const response = await fetch(
			'http://localhost:8000/logs/new',
			{method: 'POST',
			 mode: 'cors',
			 headers: {
				 'Content-Type': 'application/json',
			 },
			 body: JSON.stringify(data)
			});
		return response.text();	
	}

	async function handleSubmit(evt){
		evt.preventDefault();
		var data = {
			'activity': activity,
			'emotions': [],
			'time': `${date}T${time}-0400`,
			'depression_intensity': depressionIntensity.toString()
		}
		try {
			const responseText = await sendData(data);
			console.log(responseText);
		} catch (e){
			console.log(e);

		}
	}

	useEffect(  () => {
		fetch('http://localhost:8000/emotions/all')
		.then(response => response.json())
		.then(allEmotions => {
			setEmotionsList(allEmotions)
			console.log(allEmotions)
		})
	}, [])

	function addEmotion(event ){
		event.preventDefault();
		const newEmotion = event.target.getAttribute('dataemotion')
		const newEmotions = [...emotions, newEmotion]
		setEmotions(newEmotions)
	}

	return (
	<div className="App">
		<datalist id="tickmarks">
			<option value="0" label="0"></option>
			<option value="1"></option>
			<option value="2"></option>
			<option value="3"></option>
			<option value="4"></option>
			<option value="5" label="5"></option>
			<option value="6"></option>
			<option value="7"></option>
			<option value="8"></option>
			<option value="9"></option>
			<option value="10" label="10"></option>
		</datalist>
		<h1>Mood logger</h1>
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="activity">Activity</label>
				<input type="text"
					name="activity"
					value={activity}
					onChange={e => setActivity(e.target.value)} />
				<div id="emotions-list">
					{ emotionsList.map( (emotion) => 
						<button key={emotion._id}
								onClick={addEmotion}
								dataemotion={emotion.name}
						 		id={emotion.name}>{emotion.name}</button>
					)}

				</div>
				<label htmlFor="emotions">Emotions</label>
				<input type="text" name="emotions" value={emotions}
					onChange = {e => setEmotions(e.target.value)}/>
				<label htmlFor="time">Time</label>
				<input type="date" name="time-date" value={date}
					onChange = {e => setDate(e.target.value)} />
				<input type="time" name="time" value={time}
					onChange = {e => setTime(e.target.value)} />
				<label htmlFor="depression_intensity">Depression Intensity</label>
				<input type="range"
					min="0"
					max="10"
					step="1"
					list="tickmarks"
					name="depression_intensity" value={depressionIntensity} 
					onChange = {e => setDepressionIntensity(e.target.value)}/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	</div>
	);
}

export default App;
