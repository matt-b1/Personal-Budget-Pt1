const user = require('../Models/User');
const budget = require('../Models/Budget');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'No users found' }) 
    }
    res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
    //const { username, password, roles } = req.body
    const user = req.body;

    // Confirm data
    if (!user.username || !user.password || !Array.isArray(user.roles) || !(user.roles).length) 
        return res.status(400).json({ message: 'All fields are required'})
        
    // Check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec()
    
    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate username'})
    }
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await User.create({
            "username": user.username,
            "password": hashedPassword,
            "userInfo": {    
                "firstName": user.userInfo.firstName,
                "lastName": user.userInfo.lastName,
                "dateOfBirth": user.userInfo.dateOfBirth
            }
        })
        console.log(result);
        res.status(201).json({ 'success': `New user ${user.username} created`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
})

const updateUser = asyncHandler(async (req, res) => {

})

const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = { 
    
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
