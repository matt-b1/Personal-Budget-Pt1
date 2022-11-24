const jwt = require ('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log(authHeader); // Auth
    if (!authHeader) {
        return res.sendStatus(401);
    };
    //console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(err);
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            next();
        }
    );
}

module.exports = verifyJWT;
