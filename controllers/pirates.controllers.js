const { getAllPirates } = require('../queries/pirates.queries');

exports.getListPirates = async (req, res) => {
    try {
        const pirates = await getAllPirates(req.captain.id);
        res.status(200).json({ data: pirates });
    } catch(e) {
        res.status(401).json({ error: e.message })
    }
}