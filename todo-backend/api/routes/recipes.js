const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes.controller");

router.get("/recipes", recipesController.getAllRecipes);
router.delete("/recipes/:id", recipesController.deleteRecipe);
router.get("/recipes/:title", recipesController.getRecipe);
router.put("/recipes/:title", recipesController.updateRecipe);
router.post("/recipes", recipesController.createRecipe);

module.exports = router;
