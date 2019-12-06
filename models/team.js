const mongoose = require('mongoose')
const userSchema = require('./user')


const teamSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    user_ID : {
        type: [userSchema],
        required: true
    },
})

module.exports = mongoose.model('Team', teamSchema)
