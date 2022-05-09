const connection = require("../connection");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");

const updateUser = (req, res, next) => {
  let sql = `UPDATE users SET username = ?, password = ? WHERE users.id ="${req.params.id}"`;
  let data = {
    username: req.body.data.username,
    password: req.body.data.password,
  };
  connection.query(sql, [Object.values(data)], function (err, result, fields) {
    if (!err) {
      res.json(data);
    } else {
      res.status(400).send({
        message: "Потребителят не може да бъде редактиран!",
      });
    }
    res.end();
  });
};

const getUser = (req, res, next) => {
  connection.query(
    `SELECT * from users WHERE users.id ="${req.params.id}"`,
    function (err, result, row) {
      if (!err) {
        res.json(result);
      } else {
        res.status(400).send({
          message: "Не е открит такъв потребител.",
        });
      }
      res.end();
    }
  );
};
const registerUser = (req, res, next) => {
 // const hash = bcrypt.hashSync(req.body.user.password, 5);

  let data = {
    username: req.body.user.username,
    password: req.body.password,
    id: req.body.user.id,
    role: req.body.user.role,
    email: req.body.user.email,
  };

  let sql = `INSERT INTO users (username,password,id, role, email) VALUES (?)`;
  let message = "";

  connection.query(sql, [Object.values(data)], function (err, result) {
    if (!err) {
      message = "Correct data";
      res.json(data);
    } else {
      res.status(400).send({
        message: "Неуспешна регистрация!",
      });
    }
    res.end();
  });
};
const loginUser = (req, res, next) => {
  let email = req.body.user.email;
  let password = req.body.user.password;
  let message = "";

  let sql = `SELECT * from users WHERE email = ? AND password = ?`;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const idToken = authHeader.split(" ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        connection.query(sql, [email, password], function (err, result) {
          if (result.length > 0) {
            message = "Correct data";
            res.json(result);
          } else {
            res.status(400).send({
              message: "Грешен имейл или парола.",
            });
          }
          res.end();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return null;
};
module.exports = {
  updateUser: updateUser,
  getUser: getUser,
  registerUser: registerUser,
  loginUser: loginUser,
};
