const { 
    modifyCaptainInfos, 
    getCaptainById, 
    addPirate, 
    getPiratesOfCrew, 
    removePirateFromCrew 
} = require('../queries/captain.queries');

exports.getCaptain = async (req, res) => {
    if(req.captain) {
        const { name, id } = req.captain;
        const captain = await getCaptainById(id)
        const pirates = await getPiratesOfCrew(name);
        const { memberOfCrew } = pirates;
        res.status(200).json({ user: captain, pirates: memberOfCrew });
        res.end()
    }
    else
        res.status(401).json({ error: "Not connected" });
}

exports.editCaptain = async (req, res) => {
    if (req.captain) {
        try {
          const { id } = req.captain;
          await modifyCaptainInfos(name, req.body);
          const captainUpdate = await getCaptainById(id);
          res.status(200).json({ data: captainUpdate });
        } catch (e) {
            res.status(401).json({ error: e.message })
        }
      }
}

exports.addNewPirate = async (req, res) => {
    try {
      const { id } = req.captain;
      const { _id } = req.body;
      await addPirate(id, _id);
      res.status(200).json({ data: "success add new pirate" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

exports.removePirate = async (req, res) => {
    try {
        const { id } = req.captain;
        const { _id } = req.body;
        await removePirateFromCrew(id, _id);
        res.status(200).json({ data: "success" });
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
}
  