const mongoose = require('mongoose')

const apiSchema = new mongoose.Schema ({
    team: {
        type: Object
    },
    team_call_id: {
        type: Number
    }
})

module.exports = mongoose.model('Api', apiSchema)
