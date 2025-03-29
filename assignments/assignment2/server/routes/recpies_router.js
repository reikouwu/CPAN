const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.js");

// GET all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new recipe
router.post("/", async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET a recipe by ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT (update) a recipe by ID
router.put("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!recipe) return res.status(404).json({ message: "Not found" });
        res.json(recipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a recipe by ID
router.delete("/:id", async (req, res) => {
    try {
        const result = await Recipe.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
