const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/category", categoryController.createCategory);
router.get("/category", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getOneCategory);
router.put("/category/:id", categoryController.updateCategory);

module.exports = router;
