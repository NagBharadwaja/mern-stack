const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
// const router = express.Router();

const { requireAuth } = require("./middlwares/requireAuth");

require("dotenv").config();

// Create Express server
const app = express();
const port = process.env.PORT || 5000;

// Resolves dirname to root folder
__dirname = path.resolve();

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log("ERROR DB \n", error));

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
// router.use(requireAuth);

// Routes
const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");

app.use('/api/users', usersRouter)
app.use('/api/exercises', exercisesRouter);

// Production environment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

// Start server
app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
})
