const connection = require("../connection");

const getRecipeComments = (req, res, next) => {
  connection.query(
    `SELECT * from comments WHERE comments.recipeId = "${req.params.id}"`,
    function (err, result, row) {
      if (err) {
        res.status(400).json(err);
      }
      return res.json(result);
    }
  );
};
const createComment = (req, res, next) => {
  let data = {
    recipeId: req.body.comment.recipeId,
    comment: req.body.comment.comment,
    username: req.body.comment.username,
  };

  let sql = `INSERT INTO comments (recipeId, comment, username) VALUES (?) `;
  connection.query(sql, [Object.values(data)], function (err, result, fields) {
    if (err) {
      res.status(400).json(err);
    }
    return res.json(data);
  });
};
module.exports = {
  getRecipeComments: getRecipeComments,
  createComment: createComment,
};
