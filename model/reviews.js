const Sequelize = require("sequelize");

const sequelize = require("./../util/db");

const Reviews = sequelize.define("review", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  review: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Reviews;
