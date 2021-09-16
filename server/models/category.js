const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  image: {
    type: DataTypes.STRING,
  },
});

module.exports = category;
