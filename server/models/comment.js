const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;
