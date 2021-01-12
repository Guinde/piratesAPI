const router = require("express").Router();
const { editCaptain, addNewPirate } = require('../controllers/captain.controllers');
const { checkParamsCaptain } = require ('../middlewares/security.middlewares');

/**
 * @route POST / edit
 * @desc modify informations of captain 
 */
router.post("/edit", checkParamsCaptain, editCaptain);

/**
 * @route POST / edit
 * @desc modify informations of captain 
 */
router.post("/addNewPirate", addNewPirate);

module.exports = router;
