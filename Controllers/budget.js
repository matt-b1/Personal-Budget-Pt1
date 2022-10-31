// To complete CRUD below:

const Budget = require('../Models/Budget');
const User = require('../Models/User');
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

    //Check if user exists in User database
    const validUser = await User.findById(user).exec()

    if (!validUser) {
        console.log('User does not exist');
        return res.status(400).json({ message: 'User does not exist'})
    }

    // Confirm data
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
        console.log(`New category ${category} created for user ${validUser.username}`);
        res.status(201).json({ 'success': `New category ${category} created for user ${validUser.username}`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
})

const updateBudget = asyncHandler(async (req, res) => {
    //const user = req.body;
    const { id, user, category,  allocatedBudget } = req.body
    let validUser;
    
    
    //Check format of Object ID
    try {
        validUser = await User.findById(user).exec()
    } catch {
        //console.log('Invalid object id')
        return res.status(400).json({ message: 'Object ID is not valid'})
    }

    //Check if user exists in Users database
    if (!validUser) {
        //console.log('User does not exist');
        return res.status(400).json({ message: 'User does not exist'})
    }

    //Check all fields filled for budget request
    if (!user || !category || !allocatedBudget) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundBudget = await Budget.findById(id).exec()

    if (!foundBudget) {
        return res.status(400).json({ message: 'Category not found'})
    }
    
    // // Check for duplicate
    const duplicate = await Budget.findOne({ category }).lean().exec()
    // // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(400).json({ message: 'Duplicate category found' })
    }
    foundBudget.allocatedBudget = allocatedBudget
    


    const updatedBudget = await foundBudget.save()

    //console.log(`${updatedBudget.category} updated with new budget of ${updatedBudget.allocatedBudget}`)
    res.json({ message: `${updatedBudget.category} updated`})
})

// const deleteBudget = asyncHandler(async (req, res) => {
//     const user = req.body

//     if(!budget.id) {
//         return res.status(400).json({ message: 'Budget ID required' })
//     }

//     const budget = await Budget.findOne({ budget: budget.id }).lean().exec()
//     if (budget) {
//         return res.status(400).json({ message: 'Budget has assigned budget(s)' })
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
    updateBudget,
    //deleteBudget
}

// module.exports = { handleBudget };
