const User = require('../Models/User');
const Budget = require('../Models/Budget');
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
    const { username, password, userInfo } = req.body //Add roles
    //const user = req.body;
    // Confirm data
    if (!username || !password) 
        return res.status(400).json({ message: 'All fields are required'})
        
    // Check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec()
    if(duplicate) {
        console.log('duplicate')
        return res.status(409).json({ message: 'Duplicate username'})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            "username": username,
            "password": hashedPassword,
            "userInfo": {    
                "firstName": userInfo.firstName,
                "lastName": userInfo.lastName,
                "dateOfBirth": userInfo.dateOfBirth
            }
        })
        res.status(201).json({ 'success': `New user ${username} created`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
})

const updateUser = asyncHandler(async (req, res) => {

    const { user, totalBudget } = req.body

    //const user = req.body;
    console.log(user);
    console.log(totalBudget);

    // Confirm data
    if (!user) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //Find valid user
    /*const foundUser = await User.findById(id).exec()

    if (!foundUser) {
        return res.status(400).json({ message: 'User not found'})
    }
    */
    // Check for duplicate
    const foundUser = await User.findOne({ 'username': user }).exec()
    //console.log(foundUser);
    // Allow updates to the original user && duplicate?._id.toString() !== id
    if (foundUser) {
        foundUser.totalBudget = totalBudget;   
        //return res.status(400).json({ message: 'Duplicate username found' })
    }

    //console.log(foundUser);

    /*
    if (password) {
        // Hash password
        foundUser.password = await bcrypt.hash(user.password, 10) // salt rounds
    }
    */
    
    const updatedUser = await foundUser.save()

    res.json({ message: `${updatedUser.username} updated`})
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id, username, password } = req.body

    if(!id || !username || !password) {
        return res.status(400).json({ message: 'All fields required' })
    }

    const budget = await Budget.findOne({ user: id }).lean().exec()
    if (budget) {
        console.log('User has assigned budgets, cannot delete')
        return res.status(400).json({ message: 'User has assigned budget(s)' })
    }

    const foundUser = await User.findById(id).exec()

    if (!foundUser) {
        return res.status(400).json({ message: 'User not found' })
    }

    const deleteUser = await foundUser.deleteOne()

    const serverReply = `Username ${deleteUser.username} with ID ${deleteUser._id} deleted successfully`

    console.log(`Username ${deleteUser.username} with ID ${deleteUser._id} deleted successfully`)

    res.json(serverReply)
})

module.exports = { 
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
