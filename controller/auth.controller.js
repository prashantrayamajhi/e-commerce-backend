const User = require("./../model/users");

const bcrypt = require("bcryptjs");

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "Email already registered" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        User.create({
          email,
          password: hashedPassword,
        })
          .then(() => {
            res.status(201).json({ message: "User created" });
          })
          .catch((err) => {
            console.log(er);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
