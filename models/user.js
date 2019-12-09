const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    googleId: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    league: {
        type: String,
    },
    team: {
        type: Array
    }, 
    startingEleven: {
        type: Array
    },
    league: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)