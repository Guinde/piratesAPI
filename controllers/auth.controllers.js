const jwt = require("jsonwebtoken");
const env = require(`../environment/${process.env.NODE_ENV}.js`);
const { getCaptainByName, getPiratesOfCrew, createCaptain } = require('../queries/captain.queries');

exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const captain = await getCaptainByName(name);
        if(captain) {
            const pwdMatch = await captain.comparePassword(password);
            if(pwdMatch) {
                const { name, age, crew } = captain;
                const jwtToken = jwt.sign({
                    name,
                    age,
                    crew,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60
                }, env.jwtSecret
                );
                const pirates = await getPiratesOfCrew(name);
                console.log(pirates)
                const { memberOfCrew } = pirates;
                res.status(200).json({ data: 'success', token: jwtToken, pirates: memberOfCrew })
            } else 
                res.status(401).json({error: 'Wrong name or password'})
        } else 
            res.status(401).json({error: 'Wrong name or password'})
    } catch(e) {
        throw new Error(e.message);
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