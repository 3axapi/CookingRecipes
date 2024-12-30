const express = require('express');
const router = express.Router();
const Recipe = require("../models/Recipe");

router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find({}, {ingredients: true, rating: true});

        if (!recipes.length)
            res.status(404).json("Recipes not found!");
        else
            res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

router.get("/:recipeId", async (req, res) => {
    try {
        const recipeId = +req.params.recipeId;
        const recipe = await Recipe.find({id: recipeId}, {ingredients: true, rating: true});

        if (!recipe)
            res.status(404).json({error: 'Recipe not found'});
        else
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
        const result = await Recipe.deleteOne({id: +req.params.recipeId});

        if (!result.deletedCount)
            res.status(404).json({error: 'Recipe not found'});
        else
            res.status(200).json({message: 'Recipe deleted'});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.put("/:recipeId", async (req, res) => {
    try {
        const result = await Recipe.replaceOne({id: +req.params.recipeId}, req.body);

        if (!result.matchedCount)
            res.status(404).json({error: 'Recipe not found'});
        if (!result.modifiedCount)
            res.status(400).json({error: "Could not update recipe"});
        else
            res.status(200).json({message: 'Recipe changed successfully'});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.patch("/:recipeId", async (req, res) => {
    try {
        const result = await Recipe.updateOne({id: +req.params.recipeId}, {$set: req.body});

        if (!result.matchedCount)
            res.status(404).json({error: 'Recipe not found'});
        if (!result.modifiedCount)
            res.status(400).json({error: 'Could not update recipe'});
        else
            res.status(200).json({message: 'Recipe changed successfully'});
    } catch (err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;