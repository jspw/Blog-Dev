const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const whiteList = sequelize.define("whiteList", {});

module.exports = whiteList;
