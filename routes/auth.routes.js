const router = require("express").Router();
const { login, register } = require('../controllers/auth.controllers');

/**
 * @route POST /login
 * @desc Connexion with login  
 */
router.post("/login", login);

/**
 * @route POST /signup
 * @desc Create new captain 
 */
router.post("/register", register);

module.exports = router;
