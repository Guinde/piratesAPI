const router = require("express").Router();
const { editCaptain } = require('../controllers/captain.controllers');
const { checkParamsCaptain } = require ('../middlewares/security.middlewares');

/**
 * @route POST / edit
 * @desc modify informations of captain 
 */
router.post("/edit", checkParamsCaptain, editCaptain);



module.exports = router;
