const User = require('../Models/User');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const user = req.body;
    if (!user.username || !user.password) {
        return res.status(400).json({ 'message': 'Username or password required.'})
    }
    const foundUser = await User.findOne( { username: user.username }).exec();
    if (foundUser) {
        console.log(`${user.username} IS FOUND`);
    } else {
        console.log(`${user.username} IS MISSING`);
        return res.status(401).json({ 'message': 'User not found.'});
    }
    const match = await bcrypt.compare(user.password, foundUser.password);
    if (match) {
        res.json({ 'success': `User ${user.username} has logged in.`});
    }
    else {
        console.log('password fail');
    }
}

module.exports = { handleLogin }
