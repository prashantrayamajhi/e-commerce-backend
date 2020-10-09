const Sequelize = require("sequelize");

const sequelize = require("./../util/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    required: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = User;
