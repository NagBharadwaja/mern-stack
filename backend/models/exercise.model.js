const mongoose = require("mongoose");

// const Schema = mongoose.schema();

const exerciseSchema = mongoose.Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, requried: true },
    date: { type: Date, required: true }
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;