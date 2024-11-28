const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");

app.use(cors());
app.use(express.json());
app.use("/api/v1", UserAPI); // User routes
app.use("/api/v2", TaskAPI); // Task routes

// Fallback route for all unmatched routes
app.use("/", (req, res) => {
    res.send("Hello");
});

const PORT = 1000;

app.listen(PORT, () => {
    console.log("Server Started");
});
