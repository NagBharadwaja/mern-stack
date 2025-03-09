const express = require('express');
const router = express.Router();

const Exercise = require('../models/exercise.model');
const User = require('../models/user.model');

router.get('/', (req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json(`Error fetching exercises: ${err}`));
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(`User ${req.params.id} not found`))
});

router.put('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save();
        res.json(`Exercise ${req.body.username} - ${req.body.description} updated`);
    })
    .catch(err => res.status(400).json(`Error while updating ${req.params.id} - ${req.body.username} - ${req.body.description}`));
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Exercise ${req.params.id} deleted`))
    .catch(err => res.status(400).json(`Exercise id ${req.params.id} not deleted`));
});

router.post('/add', (req, res) => {
    const newExercise = new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date),
    });
    newExercise.save()
    .then(() => res.json(`Exercise ${req.body.description} - ${req.body.username} saved`))
    .catch(err => res.status(400).json(`Bad request for exercise: ${err}`));
});

module.exports = router;