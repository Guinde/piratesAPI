const router = require("express").Router();
const { editCaptain } = require('../controllers/captain.controllers');

/**
 * @route POST / edit
 * @desc modify informations of captain 
 */
router.post("/edit", editCaptain);



module.exports = router;
