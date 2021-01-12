const Captain = require("../database/models/captain.model");

exports.getCaptainByName = async name => {
  try {
    const captain = await Captain.findOne({ name: name }).exec();
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

  exports.modifyCaptainInfos = async (name, body) => {
    try {
      const captain = await Captain.updateOne({ name: name }, body).exec();
      return captain;
    } catch (e) {
      throw new Error(e.message);
    }
  }