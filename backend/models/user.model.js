const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
});

const endUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

// static end user login
endUserSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        console.log(`ALL FIELDS: ${username} - ${password}`);
        throw Error("All fields must be entered.");
    }
    
    const user = await this.findOne({ username });
    if (!user?._id)
        throw Error("Incorrect email.");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
        throw Error("Incorrect password");

    return user;
}

// static end user signup 
endUserSchema.statics.signup = async function(username, password) {
    if (!username || !password) {
        console.log(`ALL FIELDS: ${username} - ${password}`);
        throw Error("All fields must be entered.");
    }

    if (!validator.isEmail(username))
        throw Error("Invalid email");

    if (!validator.isStrongPassword(password))
        throw Error("Password is not strong enough");

    const userId = !!(await this.findOne({ username }))?._id;
    const isUserPresent = !!userId;
    console.log("EXISTING USER NAME: ", userId);
    console.log("EXISTS: ", isUserPresent);
    if (isUserPresent) {
        throw Error("User name is already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash });
    console.log("USER: ", user);
    return user;
}

const User = mongoose.model('User', userSchema);
const EndUser = mongoose.model('EndUser', endUserSchema);

module.exports = { User, EndUser };