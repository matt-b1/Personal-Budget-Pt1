const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    active: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },
    allocatedBudget: {
        type: Number
    } 
}, 
{
    timestamps: true
})
    
module.exports = mongoose.model('Budget', budgetSchema);    
