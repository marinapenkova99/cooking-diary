const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newsletter.controller");

router.post("/emails", newsletterController.sendEmail);

router.get("/emails", newsletterController.getAllEmails);

router.delete("/еmails/:email", newsletterController.deleteEmail);

module.exports = router;
