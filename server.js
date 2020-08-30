const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 8000 

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

mongoose.connect('mongodb://localhost:27017/moodlogs', {useNewUrlParser: true, usUnifiedTopology: true})
const logRouter = require('./routers/log')

app.get('/', (req, res) => {
	res.send('Hello world!')
})

app.use(logRouter)


app.listen(port, () => { 
	console.log(`Listening on port ${port}`)
})


