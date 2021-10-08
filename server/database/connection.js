const Sequelize = require("sequelize");
const sequelize = require("./config");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user");
db.categories = require("../models/category");
db.blogs = require("../models/blog");
db.comments = require("../models/comment");
db.followers = require("../models/follower");
db.reacts = require("../models/react");

// association

db.users.hasMany(db.blogs);
db.users.hasMany(db.comments);
db.users.hasMany(db.reacts);
db.users.hasMany(db.followers, { foreignKey: "followerId" });
db.users.hasMany(db.followers, { foreignKey: "userId" });

db.categories.hasMany(db.blogs);

db.blogs.hasMany(db.comments);
db.blogs.hasMany(db.reacts);

db.blogs.belongsTo(db.categories, {
  foreignKey: {
    allowNull: false,
  },
});
db.blogs.belongsTo(db.users, {
  foreignKey: {
    allowNull: false,
  },
});

db.comments.belongsTo(db.users, {
  foreignKey: {
    allowNull: false,
  },
});
db.comments.belongsTo(db.blogs, {
  foreignKey: {
    allowNull: false,
  },
});

db.reacts.belongsTo(db.users, {
  foreignKey: {
    allowNull: false,
  },
});

db.reacts.belongsTo(db.blogs, {
  foreignKey: {
    allowNull: false,
  },
});

db.followers.belongsTo(db.users, {
  foreignKey: { name: "followerId", allowNull: false },
});

// db.users = require("../models/user");
// db.products = require("../models/product.js");
// db.categories = require("../models/category.js");
// db.carts = require("../models/cart.js");
// db.whiteLists = require("../models/whiteList.js");
// db.orders = require("../models/order");

// category vs products

// products vs cart

// db.carts.hasMany(db.products, {
//   foreignKey: {
//     allowNull: false,
//   },
// });

// //cards
// db.carts.belongsTo(db.products);
// db.carts.belongsTo(db.users);

// // category
// db.categories.hasMany(db.products);

// // products
// db.products.belongsTo(db.categories);
// db.products.hasMany(db.carts);
// db.products.hasMany(db.orders);

// // orders
// db.orders.belongsTo(db.products);
// db.orders.belongsTo(db.users);

// // whitelist

// db.whiteLists.belongsTo(db.products);
// db.whiteLists.belongsTo(db.users);

// // user

// db.users.hasMany(db.carts);
// db.users.hasMany(db.orders);
// db.users.hasMany(db.whiteLists);

// db.users.hasMany(db.orders);
// db.orders.belongsTo(db.users);

// db.products.belongsTo(db.carts);

// db.products.belongsTo(db.carts, {
//   foreignKey: { name: "cartId", allowNull: false },
//   as: "products",
// });

// products vs whitelist

// db.whiteLists.hasMany(db.products);

// db.products.belongsTo(db.whiteLists, {
//   foreignKey: "whiteListId",
//   as: "whiteList",
// });

// db.users.hasOne(db.carts);

// db.carts.belongsTo(db.users);

// db.users.hasOne(db.whiteLists);
// db.whiteLists.belongsTo(db.users);

module.exports = db;
