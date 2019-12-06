const mongoose = require('mongoose')
const userSchema = require('./user')

const playerSchema = new mongoose.Schema ({
    name: {
        type: String
    },
    team_ID: {
        type: [userSchema],
    }
})

module.exports = mongoose.model('Player', playerSchema)
