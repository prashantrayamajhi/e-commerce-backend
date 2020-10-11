const User = require("./../model/users");

// const bcrypt = require("bcryptjs");

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "Email already registered" });
      }

      User.create({
        email,
        password,
      })
        .then(() => {
          res.status(201).json({ message: "User created" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Invalid email" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
