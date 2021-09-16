const Sequelize = require("sequelize");
const sequelize = require("./connection");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user");
db.products = require("../models/product.js");
db.categories = require("../models/category.js");
db.carts = require("../models/cart.js");
db.whiteLists = require("../models/whiteList.js");

module.exports = db;
