const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const cart = sequelize.define("cart", {});

module.exports = cart;
