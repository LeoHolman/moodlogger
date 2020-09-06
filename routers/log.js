const express = require('express')
const Log = require('../models/log')
const Emotion = require('../models/emotion')

const router = new express.Router()

router.get('/logs/all/', async (req, res, next) => {
	try {
		const allLogs = await Log.find({})
		res.send(allLogs)
	} catch (ex) {
		console.log(ex)
		res.status(500).send('Error retrieving all logs')
	}
})

router.post('/logs/new/', async (req, res, next) => {
	// console.log(`body: ${req.body}`)
	try {
		const activity = req.body.activity
		const emotionsRaw = req.body.emotions
		const emotions = Emotion.find( {name: { $in: emotionsRaw}})
		const time = req.body.time
		const depression_intensity = req.body.depression_intensity
		const newLog = new Log({activity, emotions, time, depression_intensity})

		newLog.save().then( () => {
			res.send(`${time} log saved successfully!`)
		}).catch( (err) => {
			console.log(err)
			res.status(500).send('Something went wrong')
		})
	} catch (ex) {
		console.log(ex)
		res.status(500).send('something went wrong')
	}
})

module.exports = router

