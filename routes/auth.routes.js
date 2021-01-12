const router = require("express").Router();
const { login, register } = require('../controllers/auth.controllers');
const { getCaptain } = require ('../controllers/captain.controllers');
const { verifyToken } = require('../middlewares/jwt.middlewares');
const { checkParamsLogin, checkParamsCaptain} = require("../middlewares/security.middlewares");

/**
 * @route POST /login
 * @desc Connexion with login  
 */
router.post("/login", checkParamsLogin, login);

/**
 * @route POST /signup
 * @desc Create new captain 
 */
router.post("/register", checkParamsCaptain, register);

/**
 * @route GET / user
 * @desc Get user
 */
router.get("/user", verifyToken, getCaptain);

module.exports = router;
