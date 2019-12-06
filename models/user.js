const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    league: {
        type: String,
    }
})

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

const playerSchema = new mongoose.Schema ({
    name: {
        type: String
    },
    team_ID: {
        type: [userSchema],
    }
})

const apiSchema = new mongoose.Schema ({
    team: Object
})

module.exports = mongoose.model('User', userSchema)
module.exports = mongoose.model('Player', playerSchema)
module.exports = mongoose.model('Api', apiSchema)
module.exports = mongoose.model('Team', teamSchema)