const express = require('express');
const router = express.Router();
const Recipe = require("../models/Recipe");

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
        res.status(500).json({error: error});
    }
})

router.post("/", async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.delete("/:recipeId", async (req, res) => {
    try {
        await Recipe.deleteOne({id: +req.params.recipeId});
        res.status(200).json({message: 'Recipe deleted'});

    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.put("/:recipeId", async (req, res) => {
    try {
        await Recipe.replaceOne({id: +req.params.recipeId}, req.body);
        res.status(200).json({message: 'Recipe changed successfully'});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.patch("/:recipeId", async (req, res) => {
    try {
        await Recipe.updateOne({id: +req.params.recipeId}, {$set: req.body});
        res.json({message: 'Recipe changed successfully'});
    } catch (err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;