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

module.exports = db;
