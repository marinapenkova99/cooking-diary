const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/user/login", userController.loginUser);
router.post("/user/register", userController.registerUser);
router.get("/user/:id", userController.getUser);
router.put("/user/:id", userController.updateUser);

module.exports = router;
