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
        type: Array,
        maxlength: 18,
    }, 
    startingEleven: {
        type: Array,
        maxlength: 11,
    },
    league: {
        type: String
    },
    turn: {
        type: Boolean
    }
})

module.exports = mongoose.model('User', userSchema)