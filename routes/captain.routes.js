const router = require("express").Router();
const { editCaptain, addNewPirate, removePirate } = require('../controllers/captain.controllers');
const { checkParamsCaptain } = require ('../middlewares/security.middlewares');

/**
 * @route POST / edit
 * @desc modify informations of captain 
 */
router.post("/edit", checkParamsCaptain, editCaptain);

/**
 * @route POST / addNewPirate
 * @desc add new pirate in crew
 */
router.post("/addNewPirate", addNewPirate);

/**
 * @route POST /removePirate
 * @desc remove pirate from crew 
 */
router.post("/removePirate", removePirate);

module.exports = router;
