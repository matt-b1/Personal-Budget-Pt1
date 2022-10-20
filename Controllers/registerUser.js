const User = require('../Models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const user = req.body;
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await User.create({
            "username": user.username,
            "password": hashedPassword,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "dateOfBirth": user.dateOfBirth
        })
    console.log(result);
    res.status(201).json({ 'success': `New user ${user.username} created`});
} catch (err) {
    res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
