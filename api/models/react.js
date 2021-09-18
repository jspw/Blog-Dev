const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const React = sequelize.define("react", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = React;
