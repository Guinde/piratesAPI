const router = require("express").Router();
const { getListPirates } = require('../controllers/pirates.controllers');

/**
 * @route Get / all
 * @desc get list of pirates
 */
router.get("/all", getListPirates);


module.exports = router;
