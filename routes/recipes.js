const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Recipe = require("../models/Recipe");

const database = "kitchen";
const url = `mongodb://0.0.0.0:27017/${database}`;
mongoose.connect(url);



router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.send(recipes);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

router.get("/:recipeId", async (req, res) => {
    try {
        const recipeId = +req.params.recipeId;
        const recipe = await Recipe.find({id: recipeId});
        res.send(recipe);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;