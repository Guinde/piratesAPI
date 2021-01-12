exports.getCaptain = (req, res) => {
    if(req.captain)
        res.status(200).json({ user: req.captain });
    else
        res.status(401).json({ error: "Not connected" });
}