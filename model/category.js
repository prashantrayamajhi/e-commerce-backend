const Sequelize = require("sequelize");

const sequelize = require("./../util/db");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
