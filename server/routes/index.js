const express = require("express");
const router = express.Router();
const errorHandler = require("../controllers/error");

const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

router.all(errorHandler);
module.exports = router;
