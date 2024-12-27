const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
})

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`App is listening on port ${port}`)});

process.on("SIGINT", async () => {
    console.log("SIGINT");

    try {
        await mongoose.disconnect();
        console.log("MongoDB connection has disconnected");
    } catch (error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})