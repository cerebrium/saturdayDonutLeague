require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Api = require('../models/api')

// Api call route to grab data and put it in the database

// router.get('/team', (req, res) => {
//     // console.logs
//     console.log('in the get data route')

//     // auth
//     let config = {
//             headers : {
//             "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//             "x-rapidapi-key": process.env.RAPID_API_KEY
//         }
//     }

//     // saving one team at a time to local database    
//     axios.get(`https://api-football-v1.p.rapidapi.com/v2/players/team/33`, config).then(response => {
//         console.log('response is: ', response.data)
//         Api.findOne({team_call_id: 33}, (err, api_team) => {
//             if (api_team) {
//                 api_team.update(response.data)
//             } else {
//                 let api_team = new Api({
//                     team: response.data,
//                     team_call_id: req.body.team_to_get
//                 })
//                 api_team.save();
//                 console.log('api_team is: ', api_team)
//             }
//         })
//     })
// })

    // get current years players
    router.get('/currentplayers', (req, res) => {
        const myCurrentArray = []
        const myCheckerArray = []
        console.log('============================================= in the currentplayers route')
        Api.findById({_id: '5dea9ebd4cb6ed115216499f'}, (err, team_data) => {
            if (team_data) {
                team_data.team.api.players.forEach((ele, index) => {
                    if (ele.season === "2018-2019") {
                        console.log('found one: ', ele)
                        if (!myCheckerArray.includes(ele.player_id)) {
                            myCurrentArray.push(ele)
                            myCheckerArray.push(ele.player_id)
                        }
                    }
                })
            }
            res.json(myCurrentArray)
        })
    })


module.exports = router;