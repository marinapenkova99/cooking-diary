const connection = require("../connection");

const sendEmail = (req, res, next) => {
  let data = { email: req.body.newsletter.email };
  let sql = `INSERT INTO newsletter_emails (email) VALUES (?)`;
  let message = "";

  connection.query(sql, [Object.values(data)], function (err, result) {
    if (!err) {
      message = "Correct data";
      res.json(data);
    } else {
      res.status(400).send({
        message: "Wrong email!",
      });
    }
    res.end();
  });
};
const getAllEmails = (req, res, next) => {
  connection.query(
    "SELECT * from newsletter_emails",
    function (error, results, fields) {
      if (error) {
        res.status(400).send("Emails not Found");
      }
      return res.json(results);
    }
  );
};
const deleteEmail = (req, res, next) => {
  connection.query(
    `DELETE FROM newsletter_emails WHERE newsletter_emails.email = "${req.params.email}"`,
    function (err, result, fields) {
      if (err) {
        res.status(400).send("Email not Found");
      } else {
        console.log("deleted Record: " + result.affectedRows);
      }
    }
  );
};
module.exports = {
  sendEmail: sendEmail,
  getAllEmails: getAllEmails,
  deleteEmail: deleteEmail,
};
