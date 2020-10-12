const User = require("./../model/users");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  let loadedUser;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Invalid email" });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          password: loadedUser.id.toString(),
        },
        "omaewamoushinderu",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    })
    .catch((err) => {
      console.log(err);
    });
};
