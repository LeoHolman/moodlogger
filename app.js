const express = require('express')
const app = express()
const port = 3000 

app.get('/', (req, res) => {
	res.send('Hello world!')
})

app.get('/log', (req, res) => {
	res.send('Log route')
})

app.listen(port, () => { 
	console.log(`Listening on port ${port}`)
})


