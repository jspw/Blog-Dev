const app = require("./app");
const http = require("http");
require("dotenv").config();
const db = require("./db/db");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

process.on("unhandledRejection", function (error) {
  console.log("Unhandled Rejection! Shutting down the server...");
  console.error(error);

  server.close(() => {
    process.exit(1);
  });
});
