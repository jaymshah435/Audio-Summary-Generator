require("dotenv").config();
const express = require("express");
const cors = require("cors");
const transcriptRoutes = require("./routes/transcriptRoutes");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route handling
app.use("/api/transcript", transcriptRoutes);

module.exports = app;