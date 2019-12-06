require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Api = require('../models/user')

router.get('/team', (req, res) => {
    // auth
        let headers = {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPID_API_KEY
        }

    axios.get("https://api-football-v1.p.rapidapi.com/v2/players/team/33", headers).then(response => {
        
        console.log(response)
    })
})

module.exports = router;