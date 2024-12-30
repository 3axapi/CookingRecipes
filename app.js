const express = require('express');
const mongoose = require('mongoose');
const app = express();
const recipesRoutes = require("./routes/recipes");

// mongoose connection
(async function () {
    const database = "kitchen";
    const url = `mongodb://0.0.0.0:27017/${database}`;
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
})();

// middlewares
app.use(express.json());
app.use("/api/recipes", recipesRoutes);


// server maintenance
const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`App is listening on port ${port}`)});

process.on("SIGINT", async () => {
    console.log("SIGINT");

    try {
        await mongoose.disconnect();
        console.log("MongoDB connection has disconnected");
    } catch (error) {
        console.log("Connection error:" + error.message);
    } finally {
        process.exit(0);
    }
})