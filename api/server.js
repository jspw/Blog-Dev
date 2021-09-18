const app = require("./app");
const http = require("http");
require("dotenv").config();
const db = require("./database/connection");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

db.sequelize.sync().then((_) => {
  server.listen(port, function () {
    console.log(`Server is running on port ${port}`);
  });
});

// db.sequelize
//   .query("SET FOREIGN_KEY_CHECKS = 0")
//   .then(function () {
//     return db.sequelize.sync({ force: true });
//   })
//   .then(function () {
//     return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
//   });
// .then(
//   function () {
//     console.log("Database synchronised.");
//     server.listen(port, function () {
//       console.log(`Server is running on port ${port}`);
//     });
//   },
//   function (err) {
//     console.log(err);
//   }
// );
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   server.listen(port, function () {
//     console.log(`Server is running on port ${port}`);
//   });
// });

process.on("unhandledRejection", function (error) {
  console.log("Unhandled Rejection! Shutting down the server...");
  console.error(error);

  server.close(() => {
    process.exit(1);
  });
});
