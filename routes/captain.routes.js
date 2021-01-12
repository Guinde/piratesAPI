const router = require("express").Router();
const { editCaptain } = require('../controllers/captain.controllers');

/**
 * @route POST /login
 * @desc Connexion with login  
 */
router.post("/edit", editCaptain);



module.exports = router;
