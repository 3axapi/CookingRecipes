const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    ingredients: {type: String},
    description: {type: String},
    rating: {type: Number, min: 0, max: 10}
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;