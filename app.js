const recipes = [
    {
        id: 1,
        name: "Pancake",
        ingredients: "flour, eggs, milk, mineral water, sugar, honey, oil, soil, butter",
        description: "Crack the eggs into a bowl and mix with the sugar and honey." +
            "Then add the remaining ingredients – flour, milk, water, salt and oil – and mix using a mixer. " +
            " dough should have a smooth consistency." +
            "Fry pancakes on both sides on a heated and lightly greased pan until golden brown." +
            "You can make your own vanilla sugar at home – put a cut vanilla pod in a jar, then cover it with regular sugar, close the jar and leave for a few days.",
        rating: 5
    },
    {
        id: 2,
        name: "Chicken Pancakes",
        ingredients: "pancakes, spaghetti, chicken breast fillet, carrot, cheese, sour cream",
        description: "Remove the membranes from the chicken breast fillet and divide into small but equal-sized cubes." +
            "Wash, peel and dice the carrots. Turn on the oven and set the temperature to 200°C." +
            "Before it heats up, grate the yellow cheese on a coarse grater. Pour a spoonful of oil into the pan." +
            "When the fat is well heated, throw in the meat with carrots and fry until golden, stirring often." +
            "Then add 200 ml of water and the entire contents of the Knorr Naturally tasty - Spaghetti Bolognese package." +
            "Mix all the ingredients together, bring to the boil and cook for about 5 minutes, then set aside to cool." +
            "When the filling is not hot, fill the pancakes with it and roll them into rolls." +
            "Arrange the finished pancakes quite tightly in a well-greased baking dish." +
            "Spread the cream on them and sprinkle with grated cheese. Bake the dish for about 10-20 minutes, until the cheese melts and browns golden.",
        rating: 5
    },
    {
        id: 3,
        name: "Chef's Salad",
        ingredients: "iceberg lettuce, garlic salad dressing, mayonnaise, ketchup, grilled chicken breast, canned ham, cheese, red pepper, red onion, fresh cucumber",
        description: "Tear the lettuce into smaller pieces." +
            "Cut all the vegetables, cheese and ham into thin strips, known as julienne." +
            "In a bowl, combine Knorr salad dressing with ketchup and mayonnaise." +
            "In a large bowl, combine all salad ingredients. Add the prepared dressing and mix everything together gently." +
            "Transfer the salad to a serving bowl and serve.",
        rating: 10
    },
    {
        id: 4,
        name: "Delicate herrings under a blanket of mayonnaise",
        ingredients: "herrings a la matjas in oil, Hellmann's Original Mayonnaise, apple, garlic salad dressing, white onion",
        description: "Squeeze the herrings out of excess oil on a paper towel." +
            "Then cut them into larger pieces and arrange them on a plate or platter." +
            "Finely dice the apple and onion for the herring under the blanket, then mix with the mayonnaise and Knorr Garlic Salad Dressing." +
            "Spread a layer of the creamy mayonnaise sauce over the herrings, just enough to cover them." +
            "Chill the herrings in the fridge for an hour before serving.",
        rating: 5
    },
    {
        id: 5,
        name: "Almond soup",
        ingredients: "almond flour, Knorr Garlic Mini Cubes Seasoning, Knorr Fried Onion Mini Cubes Seasoning, almond milk, wheat baguette, apple cider vinegar, olive oil, sea salt",
        description: "Add the torn baguette, almond flour, milk, Knorr mini cubes, vinegar, salt to the mixing bowl and mix for 5 min/speed 10." +
            "Now reduce the speed to speed 3, remove the measuring cup and slowly add the olive oil in a thin stream." +
            "Mix again for 1 min/speed 10. Serve cold, sprinkled with fresh olive oil and herbs.",
        rating: 6
    }
];

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const recipesRoutes = require("./routes/recipes");
const Recipe = require("./models/Recipe.js");

// middlewares
app.use(express.json());
app.use("/api/recipes", recipesRoutes);

// connecting to mongoose and initializing the script
(async function () {
    const url = "mongodb://0.0.0.0:27017/kitchen";
    await mongoose.connect(url);
    console.log("Connected to MongoDB");

    try {
        const recipesCount = await Recipe.find({});
        if (!recipesCount.length) {
            await Recipe.insertMany(recipes);
            console.log("script initializing successfully.");
        }
    } catch (error) {
        console.log("MongoDB connection error: " + error.message);
    }

})();

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