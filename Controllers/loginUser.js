const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../app');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const user = req.body;
    if (!user.username || !user.password) {
        return res.status(400).json({ 'message': 'Username or password required.'})
    }
    const foundUser = await User.findOne( { username: user.username }).exec();
    if (foundUser) {
        //console.log(`${user.username} IS FOUND`);
    } else {
        //console.log(`${user.username} IS MISSING`);
        return res.status(401).json({ 'message': 'User not found.'});
    }
    const match = await bcrypt.compare(user.password, foundUser.password);
    if (match) {
        const accessToken = jwt.sign( 
            {
                "username" : foundUser.username
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            {
                "username" : foundUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        foundUser.refreshToken = refreshToken;
        //save and update user to database
        const result = await foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure:true, maxAge: 24 * 60 * 60 * 1000 }) // Add secure: true
        res.json({ accessToken });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }
