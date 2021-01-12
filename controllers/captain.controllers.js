const { modifyCaptainInfos, getCaptainByName } = require('../queries/captain.queries');

exports.getCaptain = (req, res) => {
    if(req.captain)
        res.status(200).json({ user: req.captain });
    else
        res.status(401).json({ error: "Not connected" });
}

exports.editCaptain = async (req, res) => {
    if (req.captain) {
        try {
          const { name } = req.captain;
          await modifyCaptainInfos(name, req.body);
          const captainUpdate = await getCaptainByName(name);
          res.status(200).json({ data: captainUpdate });
        } catch (e) {
            res.status(401).json({ error: e.message })
        }
      }
}