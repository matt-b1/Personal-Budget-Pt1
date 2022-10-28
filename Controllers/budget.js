// To complete CRUD below:

const Budget = require('../Models/Budget');
const asyncHandler = require('express-async-handler');

// async function handleBudget (req, res) {
//     console.log(`Hello ${req.user}`);
//     res.send(`Hello`);
// }

const getAllBudgets = asyncHandler(async (req, res) => {
    const budget = await Budget.find();
    if (!budget?.length) {
        return res.status(400).json({ message: 'No categories found' }) 
    }
    console.log(budget);
    res.json(budget);
})

const createNewBudget = asyncHandler(async (req, res) => {
    //const budget = req.body
    const { user, category, allocatedBudget } = req.body;

    // // Confirm data
    if (!user || !category) {    
        return res.status(400).json({ message: 'All fields are required'})
    }
        
    // Check for duplicates
    const duplicate = await Budget.findOne({ user, category }).lean().exec()
    
    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate category for user.'})
    }
    try {
        const newCategory = await Budget.create({
            user,
            category,
            allocatedBudget
        })
        console.log(newCategory);
        console.log(`New category ${category} created`);
        res.status(201).json({ 'success': `New category ${category} created`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
})

// const updateBudget = asyncHandler(async (req, res) => {
//     //const { id, username, roles, password } = req.body
//     const user = req.body;
//     // Confirm data
//     if (!user.id || !user.username || !(user.roles).length || !user.password || !Array.isArray(user.roles)) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     const foundUser = await User.findById(id).exec()

//     if (!foundUser) {
//         return res.status(400).json({ message: 'User not found'})
//     }
    
//     // Check for duplicate
//     const duplicate = await User.findOne({ username }).lean().exec()
//     // Allow updates to the original user
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(400).json({ message: 'Duplicate username found' })
//     }
//     foundUser.username = user.username;
//     foundUser.roles = user.roles;

//     if (password) {
//         // Hash password
//         foundUser.password = await bcrypt.hash(user.password, 10) // salt rounds
//     }
    
//     const updatedUser = await foundUser.save()

//     res.json({ message: `${updatedUser.username} updated`})
// })

// const deleteBudget = asyncHandler(async (req, res) => {
//     const user = req.body

//     if(!user.id) {
//         return res.status(400).json({ message: 'User ID required' })
//     }

//     const budget = await Budget.findOne({ user: user.id }).lean().exec()
//     if (budget) {
//         return res.status(400).json({ message: 'User has assigned budget(s)' })
//     }

//     const foundUser = await User.findById(id).exec()

//     if (!foundUser) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted successfully`

//     res.json(reply)
// })

module.exports = { 
    getAllBudgets,
    createNewBudget,
    //updateBudget,
    //deleteBudget
}

// module.exports = { handleBudget };
