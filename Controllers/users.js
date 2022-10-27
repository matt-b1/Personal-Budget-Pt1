const user = require('../Models/User');
const budget = require('../Models/Budget');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
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
        const newUser = await User.create({
            "username": user.username,
            "password": hashedPassword,
            "userInfo": {    
                "firstName": user.userInfo.firstName,
                "lastName": user.userInfo.lastName,
                "dateOfBirth": user.userInfo.dateOfBirth
            }
        })
        console.log(newUser);
        res.status(201).json({ 'success': `New user ${user.username} created`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
})

const updateUser = asyncHandler(async (req, res) => {
    //const { id, username, roles, password } = req.body
    const user = req.body;
    // Confirm data
    if (!user.id || !user.username || !(user.roles).length || !user.password || !Array.isArray(user.roles)) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findById(id).exec()

    if (!foundUser) {
        return res.status(400).json({ message: 'User not found'})
    }
    
    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(400).json({ message: 'Duplicate username found' })
    }
    foundUser.username = user.username;
    foundUser.roles = user.roles;

    if (password) {
        // Hash password
        foundUser.password = await bcrypt.hash(user.password, 10) // salt rounds
    }
    
    const updatedUser = await foundUser.save()

    res.json({ message: `${updatedUser.username} updated`})
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = req.body

    if(!user.id) {
        return res.status(400).json({ message: 'User ID required' })
    }

    const budget = await Budget.findOne({ user: user.id }).lean().exec()
    if (budget) {
        return res.status(400).json({ message: 'User has assigned budget(s)' })
    }

    const foundUser = await User.findById(id).exec()

    if (!foundUser) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted successfully`

    res.json(reply)
})

module.exports = { 
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
