// Database Model
const { User, EndUser } = require('../models/user.model');
const jwt = require("jsonwebtoken");

const createToken = _id => {
    const token = jwt.sign(
        { _id },
        process.env.AUTH_SECRET,
        { expiresIn: '3d' }
    );
    return token;
}

// Log in user
const loginUser = async (req, res) => {
    console.log(`LOG IN REQUEST: `, req.body);
    const { email, password } = req.body.body;
    try {
        const user = await EndUser.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// Sign up user
const signupUser = async (req, res) => {
    console.log(`SIGN UP REQUEST: `, req.body);
    const { email, password } = req.body.body;
    console.log(`SIGN UP ${email} - ${password}`);
    try {
        const user = await EndUser.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// Get user & exercise info
const getUserAndExerciseInfo = (req, res) => {
    User.find()
    .then(User => res.json(User))
    .catch(error => res.status(400).json(`Error: ${error}`));
}

// Get specific user
const getUserInfo = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(`User ${user.username} found!`))
    .catch(err => res.status(400).json(`User id ${req.params.id} not found!`));
}

// Delete specific user
const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json(`User id ${req.params.id} deleted!`))
    .catch(err => res.status(400).json(`User id ${req.params.id} is not deleted`));
}

const addUser = (req, res) => {
    const username = req.body.username;
    const newUser = new User({ username })
    newUser.save()
    .then(() => res.json(`User ${username} added`))
    .catch(err => res.status(500).json(`Bad Request for user: ${username}`));
};

module.exports = {
    loginUser,
    signupUser,
    addUser,
    getUserAndExerciseInfo,
    getUserInfo,
    deleteUser,
}