const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");

router.get("/comments/:id", commentsController.getRecipeComments);
router.post("/comments", commentsController.createComment);

module.exports = router;
