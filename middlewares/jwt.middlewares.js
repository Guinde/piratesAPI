const jwt = require("jsonwebtoken");
const env = require('../environment/development');

/**
 * @param { Object } token
 * @desc Create token
 * @return { Object } new token
 */
exports.createJwtToken = (name, age, crew) => {
    const jwtToken = jwt.sign({
        name,
        age,
        crew,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
    }, env.jwtSecret
    );
    return jwtToken;
};