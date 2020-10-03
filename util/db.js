const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBURI,
    dialect: "postgres",
    port: process.env.PORT,
  }
);

module.exports = sequelize;
