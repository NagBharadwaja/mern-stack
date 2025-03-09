const mongoose = require("mongoose");

// const Schema = mongoose.schema();

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;