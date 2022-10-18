const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;

async function connect() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };
