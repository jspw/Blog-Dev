const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Category;
