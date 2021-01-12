const router = require("express").Router();
const authRouter = require('./auth.routes');
const captainRouter = require('./captain.routes');

router.use("/auth", authRouter);
routes.use("captain", captainRouter)

module.exports = router;
