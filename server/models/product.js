const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const product = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sellingPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  regularPrice: {
    type: DataTypes.DOUBLE,
  },
  image: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.DOUBLE,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = product;
