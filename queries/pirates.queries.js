const Pirate = require("../database/models/pirate.model");
const { getCaptainById } = require('./captain.queries');

exports.getAllPirates = async id => {
    try {
      const captain = await getCaptainById(id);
      const pirates = await Pirate.find({
        _id: { $nin: [...captain.memberOfCrew] },
      }).exec();
      return pirates;
    } catch (e) {
      throw new Error(e.message);
    }
  };