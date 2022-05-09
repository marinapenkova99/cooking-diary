const connection = require("../connection");

const getAllRecipes = (req, res, next) => {
  connection.query("SELECT * from recipes", function (error, results, fields) {
    if (error) {
      res.status(400).send("Recipe not Found");
    }
    return res.json(results);
  });
};
const deleteRecipe = (req, res, next) => {
  connection.query(
    `DELETE FROM recipes WHERE recipes.id = ${req.params.id}`,
    function (err, result, fields) {
      if (err) {
        res.status(400).send("Recipe not Found");
      } else {
        console.log("deleted Record: " + result.affectedRows);
        res.redirect("/recipes");
      }
    }
  );
};
const getRecipe = (req, res, next) => {
  connection.query(
    `SELECT * from recipes WHERE recipes.title = "${req.params.title}"`,
    function (err, result, row) {
      if (err) {
        res.status(400).json(err);
      }
      return res.json(result);
    }
  );
};
const updateRecipe = (req, res, next) => {
  let sql = `UPDATE recipes SET title = ?,Date= ?,description = ?, image =?, categoryId =?, cooking_time =?, level_of_difficulty =? WHERE recipes.title = "${req.params.title}"`;
  let data = {
    title: req.body.recipe.title,
    date: req.body.recipe.Date,
    description: req.body.recipe.description,
    image: req.body.recipe.image,
    categoryId: req.body.recipe.categoryId,
    cooking_time: req.body.recipe.cooking_time,
    level_of_difficulty: req.body.recipe.level_of_difficulty,
  };

  connection.query(sql, [Object.values(data)], function (err, result, fields) {
    if (err) {
      res.status(400).json(err);
    }
    return res.json(data);
  });
};
const createRecipe = (req, res, next) => {
  let data = {
    id: req.body.recipe.id,
    title: req.body.recipe.title,
    date: req.body.recipe.Date,
    description: req.body.recipe.description,
    image: req.body.recipe.image,
    categoryId: req.body.recipe.categoryId,
    cooking_time: req.body.recipe.cooking_time,
    level_of_difficulty: req.body.recipe.level_of_difficulty,
  };
  let sql = `INSERT INTO recipes (id,title, Date, description, image, categoryId, cooking_time, level_of_difficulty) VALUES (?) `;
  connection.query(sql, [Object.values(data)], function (err, result, fields) {
    if (err) {
      res.status(400).json(err);
    }
    return res.json(data);
  });
};
module.exports = {
  getAllRecipes: getAllRecipes,
  deleteRecipe: deleteRecipe,
  getRecipe: getRecipe,
  updateRecipe: updateRecipe,
  createRecipe: createRecipe,
};
