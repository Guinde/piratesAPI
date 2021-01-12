const jwt = require("jsonwebtoken");
const env = require('../environment/development');

/**
 * @param { Object } token
 * @desc Create token
 * @return { Object } new token
 */
exports.createJwtToken = (id, name, age, crew) => {
    const jwtToken = jwt.sign({
        id,
        name,
        age,
        crew,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
    }, env.jwtSecret
    );
    return jwtToken;
};

const checkExpirationToken = token => {
    const tokenExp = token.exp;
    const nowInSec = Math.floor(Date.now() / 1000);
    if(nowInSec > tokenExp)
        throw new Error("Token expired")
}

const verifyBearerToken = bearerHeader => {
    if(bearerHeader){
        const bearerToken = bearerHeader.split(' ');
        if(bearerToken[0] === 'Bearer' && bearerToken[1]) 
            return bearerToken[1];
        else 
            throw new Error("Not authorized")
    } else {
        throw new Error("Not authorized")
    }
}

exports.verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const token = verifyBearerToken(bearerHeader);
        checkExpirationToken(token);
        const decodedToken = jwt.verify(token, env.jwtSecret, { ignoreExpiration: true });
        req.captain = decodedToken;
        next();
    } catch(e) {
        res.status(401).json({ error: e.message })
    }

}