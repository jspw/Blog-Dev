const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const Blog = sequelize.define("blog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

module.exports = Blog;
