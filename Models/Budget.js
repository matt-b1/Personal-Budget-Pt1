const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    active: {
        type: Boolean
    },
    category: {
        type: String,
        required: true
    },
    allocatedBudget: {
        type: Number
    },
    entryDate: {
        type: Date
    }
})


    
module.exports = mongoose.model('Budget', budgetSchema);    
