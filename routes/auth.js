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

module.exports = router;