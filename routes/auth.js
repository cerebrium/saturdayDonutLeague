const express = require('express');
const router = express.Router();
const User = require('../models/user')

// Storing user data in the database for team creation and checking
router.post('/signup', (req, res) => {
    // console.log('inside the db posting route', req.body.email)
    // find user based on email
    User.findOne({ email: req.body.email }, (err, user) => {
        // if user found wont write anything, else going to write to db
       if (user) {
           res.json(user)
       } else {
            let user = new User(req.body)
            user.save();
            res.json(user)
       }
    })
})

// Getting league name
router.get('/lname/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (user.league) {
            res.json({
                leagueName: user.league,
            })
        } else {
            res.json('needs a league')
        }
    })
})

// posting league name
router.post('/addlname/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.league = req.body.leaguename
        user.save()
        res.json('user league name saved')
    })
})

// Getting info about all users
router.get('/lnames/allnames/:name', (req, res) => {
    User.find({league: req.params.name}, (err, users) => {
        res.json(users)
    })
})

// Making a draft
router.get('/draft/:name', (req, res) => {
    // array of team lengths
    let teamLengthsArray = []

    User.find({league: req.params.name}, (err, users) => {
        // Check lengths of the teams
        users.forEach((ele) => {
            teamLengthsArray.push(ele.team.length)
        })

        // if all teams equal each other
        let mySet = new Set(teamLengthsArray)
        if (mySet.size === 1) {

            // set users[0].turn = true
            users[0].turn = true
            users[0].save()

            // res.json all of the users
            res.json(users)

        } else {

            // make all users turns false
            users.forEach((ele) => {
                ele.turn = false
                ele.save()
            })

            // find index of first user not with a team length equal to the first user
            let check = users[0].team.length
            var myArray = []

            // Make array of all users that havent gone yet
            users.forEach((ele) => {
                if (ele.team.length !== check) {
                    myArray.push(ele)
                }
            })

            // make first user in the not-gone-users-array have a turn
            myArray[0].turn = true
            myArray[0].save()

            // send users to front end
            res.json(users)
        }
    })
})

module.exports = router;