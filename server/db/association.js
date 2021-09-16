const { db } = require("./connection");

db.categories.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category",
});

db.carts.hasMany(db.products, { as: "products" });

db.products.belongsTo(db.carts, {
  foreignKey: "cartId",
  as: "cart",
});

db.whiteLists.hasMany(db.products, { as: "products" });

db.products.belongsTo(db.whiteLists, {
  foreignKey: "whiteListId",
  as: "whiteList",
});

db.carts.belongsTo(db.users, {
  as: "cart",
});

db.whiteLists.belongsTo(db.users, {
  as: "whiteList",
});
