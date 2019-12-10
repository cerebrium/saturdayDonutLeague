require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Api = require('../models/api')


// Adding player to team from team selection page
router.post('/add', (req, res) => {
    var playerToAdd;  
    // displaying player from the list of players on the left
    Api.findById('5df00ec122ee88758aa87e05', (err, team) => {
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

// Grab the current users full selected team
router.get('/current/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        res.json(user.team)
    })  
})

// Save the selected starting eleven for the week to 'starting eleven'
router.post('/startingeleven/:id', (req, res) => {
    console.log('before finding user', req.params.id)
    User.findById(req.params.id, (err, user) => {
        let startingArray = []
        console.log(user)
        req.body.forEach((ele) => {
            startingArray.push(ele)
        })
        user.startingEleven = startingArray
        console.log('==================================================', user.startingEleven)
        user.save()
        res.json(user.startingEleven)
    })
})

module.exports = router;