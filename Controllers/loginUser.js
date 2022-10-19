const User = require('../Models/User');

const handleLogin = async (req, res) => {
    const user = req.body;
    const foundUser = await User.findOne( { username: user.username }).exec();
    if (foundUser) {
        console.log(`${user.username} IS FOUND`);
        return res.sendStatus(200);
    } else {
        console.log(`${user.username} IS MISSING`);
        return res.sendStatus(401);
    }
    
}

module.exports = { handleLogin }
