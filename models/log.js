const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
	activity: String,
	emotions: [{name: String}],
	time: {type: Date},
	depression_intensity: {type: Number, min: 0, max: 10}
})

const Log = mongoose.model('Log', logSchema)

module.exports = Log;
