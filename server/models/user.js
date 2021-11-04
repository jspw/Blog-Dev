const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/config");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(60),
  },
  lastName: {
    type: DataTypes.STRING(50),
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  bio: {
    type: DataTypes.STRING(200),
  },
  github: {
    type: DataTypes.STRING(50),
  },
  address: {
    type: DataTypes.STRING(50),
  },
  birthday: {
    type: DataTypes.DATE,
  },
});

module.exports = User;
