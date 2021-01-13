const jwt = require("jsonwebtoken");
const env = require(`../environment/${process.env.NODE_ENV}.js`);
const { getCaptainByName, getPiratesOfCrew, createCaptain } = require('../queries/captain.queries');
const { createJwtToken } = require('../middlewares/jwt.middlewares');

exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const captain = await getCaptainByName(name);
        if(captain) {
            const pwdMatch = await captain.comparePassword(password);
            if(pwdMatch) {
                const { _id, name, age, crew } = captain;
                const jwtToken = createJwtToken(_id, name, age, crew);
                res.status(200).json({ data: 'success', token: jwtToken })
            } else 
                res.status(401).json({ error: 'Wrong name or password' })
        } else 
            res.status(401).json({ error: 'Wrong name or password' })
    } catch(e) {
        res.status(401).json({ error: e.message })
    }
}

exports.register = async (req, res) => {
    try {
        const { body } = req;
        const captain = await createCaptain(body);
        res.status(200).json({ data: captain });
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
}

exports.logout = (req, res) => {
    req.captain = null;
    res.status(200).json({ data: 'Logout success' })
}