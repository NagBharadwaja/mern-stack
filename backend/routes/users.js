const express = require("express");
const router = express.Router();

const { requireAuth } = require('../middlwares/requireAuth');
const User = require('../models/user.model');

// User controllers
const {
    loginUser,
    signupUser,
    getUserAndExerciseInfo,
    getUserInfo,
    deleteUser,
    addUser,
} = require("../controllers/userController.js");



// Login route
router.post('/login', loginUser);

// Sign up route
router.post('/signup', signupUser);

router.use(requireAuth);

router.get('/', getUserAndExerciseInfo);

// Get specific user
router.get('/:id', getUserInfo)

// Delete specific user
router.delete('/:id', deleteUser);

router.post('/add', addUser);

module.exports = router;