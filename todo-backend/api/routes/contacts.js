const express = require("express");
const router = express.Router();
const contactsController = require("./../controllers/contacts.controller");

router.post("/contacts", contactsController.createContact);

router.get("/contacts", contactsController.getAllContacts);

router.delete("/contacts/:id", contactsController.deleteContact);

module.exports = router;
