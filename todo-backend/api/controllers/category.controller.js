const connection = require("../connection");

const getAllCategories = (req, res, next) => {
  connection.query(
    "SELECT * from categories",
    function (error, results, fields) {
      if (error) {
        res.status(400).send("Category not Found");
      }
      return res.json(results);
    }
  );
};
const createCategory = (req, res, next) => {
  let data = {
    id: req.body.category.id,
    name: req.body.category.name,
  };
  let sql = `INSERT INTO categories (id,name) VALUES (?) `;
  connection.query(sql, [Object.values(data)], function (err, result, fields) {
    if (err) {
      res.status(400).json(err);
    }
    return res.json(data);
  });
};
const getOneCategory = (req, res, next) => {
  connection.query(
    `SELECT * from categories WHERE categories.id = "${req.params.id}"`,
    function (err, result, row) {
      if (err) {
        res.status(400).json(err);
      }
      return res.json(result);
    }
  );
};
const updateCategory = (req, res, next) => {
  let sql = `UPDATE categories SET name = ? WHERE categories.id = "${req.params.id}"`;
  let data = {
    name: req.body.category.name,
  };
  connection.query(sql, [Object.values(data)], function (err, result, fields) {
    if (err) {
      res.status(400).json(err);
    }
    return res.json(data);
  });
};
module.exports = {
  getAllCategories: getAllCategories,
  createCategory: createCategory,
  getOneCategory: getOneCategory,
  updateCategory: updateCategory,
};
