const { isValidObjectId } = require("mongoose");
const Captain = require("../database/models/captain.model");

exports.getCaptainByName = async name => {
  try {
    const captain = await Captain.findOne({ name: name })
    .exec();
    return captain;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getCaptainById = async id => {
  try {
    const captain = await Captain.findById(id)
    .exec();
    return captain;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getPiratesOfCrew = async name => {
    try {
        const pirates = await Captain.findOne({ name: name })
        .populate("memberOfCrew")
        .select("memberOfCrew")
        .exec();
        return pirates;
    } catch(e) {
        throw new Error(e.message);
    }
}

exports.createCaptain = async body => {
    try {
      const { name, password, age, crew } = body;
      const hashdPwd = await Captain.hashPassword(password);
      const captain = new Captain({
        name,
        age,
        crew,
        password: hashdPwd,
      });
      return captain.save();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  exports.modifyCaptainInfos = async (id, body) => {
    try {
      const captain = await Captain.updateOne({ _id: id }, body).exec();
      return captain;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  exports.addPirate = async (id, pirateId) => {
    try {
      return await Captain.updateOne(
        { _id: id },
        { $push: { memberOfCrew: pirateId } }
      ).exec();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  exports.removePirateFromCrew = async (id, pirateId) => {
    try {
      return await Captain.updateOne(
        { _id: id },
        { $pull: {  memberOfCrew: pirateId } }
      ).exec();
    } catch (e) {
      throw new Error(e.message);
    }
  }