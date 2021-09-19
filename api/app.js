const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const ejs = require("ejs");

const router = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());

app.use(xssClean());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res, next) => {
//   res.send("Hello World");
//   console.log("Hello World");
//   next();
// });

app.use(router);

module.exports = app;
