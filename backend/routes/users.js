const express = require("express");
const router = express.Router();

// Database Model
const User = require('../models/user.model');

router.get('/', (req, res) => {
    User.find()
    .then(User => res.json(User))
    .catch(error => res.status(400).json(`Error: ${error}`));
})

// Get specific user
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(`User ${user.username} found!`))
    .catch(err => res.status(400).json(`User id ${req.params.id} not found!`));
})

// Delete specific user
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json(`User id ${req.params.id} deleted!`))
    .catch(err => res.status(400).json(`User id ${req.params.id} is not deleted`));
});

router.post('/add', (req, res) => {
    const username = req.body.username;
    const newUser = new User({ username })
    newUser.save()
    .then(() => res.json(`User ${username} added`))
    .catch(err => res.status(500).json(`Bad Request for user: ${username}`));
})

module.exports = router;