const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    id: {type: Number, unique: true, required: true},
    name: {type: String, maxLength: 50, required: true},
    ingredients: {type: String, required: true},
    description: {type: String, required: true},
    rating: {type: Number, min: 0, max: 10, required: true}
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;