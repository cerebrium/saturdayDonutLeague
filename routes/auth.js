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
    console.log('in the lname/:id route')
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
    console.log('found the addleaguename route')
    User.findById(req.params.id, (err, user) => {
        console.log(req.body.leaguename)
        user.league = req.body.leaguename
        user.save()
        res.json('user league name saved')
    })
})

// Getting info about all users
router.get('/lname/allnames', (req, res) => {
    // Switch to admin database and get list of databases.
    db = db.getSiblingDB("admin");
    dbs = db.runCommand({ "listDatabases": 1 }).databases;

    // Iterate through each database and get its collections.
    dbs.forEach(function(database) {
        db = db.getSiblingDB(database.name);
        cols = db.getCollectionNames();

        // Iterate through each collection.
        cols.forEach(function(col) {

            // Do something with each collection.
            console.log(col)
        });
    });
    res.json('got some datas')
})

module.exports = router;