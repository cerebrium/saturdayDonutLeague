require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Api = require('../models/api')

router.post('/add', (req, res) => {
    var playerToAdd;  
    // displaying player from the list of players on the left
    Api.findById('5dea9ebd4cb6ed115216499f', (err, team) => {
        let myNum = req.body.playerId
        team.team.api.players.forEach((ele, index) => {
            if (parseInt(ele.player_id) === parseInt(myNum)) {
                if (ele.season === '2018-2019' && ele.league === 'Premier League') {
                    playerToAdd = team.team.api.players[index]
                    team.team.api.players[index] = {}
                }
            }
        })

        // adding player to team
        User.findById(req.body.userId, (err, user) => {
            user.team.push(playerToAdd)
            user.save()
            res.json(playerToAdd)
        })
    })
})

router.get('/current/:id', (req, res) => {
    console.log('in current team', req.params.id)
    User.findById(req.params.id, (err, user) => {
        res.json(user.team)
    })  
})


module.exports = router;