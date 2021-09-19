var express = require("express");
var router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");
const blogRouter = require("./blog");
const followerRouter = require("./follower");
const reactRouter = require("./react");
const commentRouter = require("./comment");
const { protector } = require("../middleware/protector");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/blog", blogRouter);
router.use("/react", reactRouter);
router.use("/comment", commentRouter);
router.use("/follower", followerRouter);
router.use("/", protector, userRouter);

module.exports = router;
