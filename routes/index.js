const router = require("express").Router();
const authRouter = require('./auth.routes');
const captainRouter = require('./captain.routes');
const { verifyToken } = require('../middlewares/jwt.middlewares');

router.use("/auth", authRouter);
router.use("/captain", verifyToken, captainRouter)

module.exports = router;
