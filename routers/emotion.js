const express = require('express');
const Emotion = require('../models/emotion');

const router = new express.Router()

router.get('/emotions/all', async (req, res, next) => {
    try {
        const allEmotions = await Emotion.find({});
        res.send(allEmotions);
    } catch (ex) {
        console.log(ex);
        res.status(500).send('Error retriving all emotions');
    }
})

router.post('/emotions/new', async (req, res, next) => {
    try {
        const name = req.body.name;
        console.log(name);
        const newEmotion = new Emotion({name});

        newEmotion.save().then( () => {
            res.send(`${name} saved successfully`)
        }).catch( (err) => {
            console.log(err)
            res.status(500).send('Something went wrong')
        })
    } catch (ex) {
        console.log(ex)
        res.status(500).send('Something went wrong')
    }
})

module.exports = router