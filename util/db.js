const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = new Sequelize("dbname", "username", "password", {
  dialect: "postgres",
});

module.exports = sequelize;
