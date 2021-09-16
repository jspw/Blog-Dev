const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const user = sequelize.define("user", {
  firstName: {
    type: DataTypes.STRING(60),
  },
  lastName: {
    type: DataTypes.STRING(50),
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(50),
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = user;
