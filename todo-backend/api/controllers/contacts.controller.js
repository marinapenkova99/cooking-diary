const connection = require("../connection");

const createContact = (req, res, next) => {
  let data = {
    id: req.body.contact.id,
    name: req.body.contact.name,
    surname: req.body.contact.surname,
    email: req.body.contact.email,
    phone: req.body.contact.phone,
    message: req.body.contact.message,
  };
  let sql = `INSERT INTO contacts (id, name, surname, email, phone, message) VALUES (?) `;
  connection.query(sql, [Object.values(data)], function (err, result, fields) {
    if (err) {
      res.status(400).json(err);
    }
    return res.json(data);
  });
};
const getAllContacts = (req, res, next) => {
  connection.query("SELECT * from contacts", function (error, results, fields) {
    if (error) {
      res.status(400).send("Contact not Found");
    }
    return res.json(results);
  });
};
const deleteContact = (req, res, next) => {
  connection.query(
    `DELETE FROM contacts WHERE contacts.id = "${req.params.id}"`,
    function (err, result, fields) {
      if (err) {
        res.status(400).send("Contact not Found");
      } else {
        res.status(200).send("Contact is deleted");
        console.log("deleted Record: " + result.affectedRows);
      }
    }
  );
};
module.exports = {
  createContact: createContact,
  getAllContacts: getAllContacts,
  deleteContact: deleteContact,
};
