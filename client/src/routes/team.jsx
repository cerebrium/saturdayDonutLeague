import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Team (props) {

    const [ players, setPlayers ] = useState([])
    const [ player, setPlayer ] = useState(null)
    const [ currentTeam, setCurrentTeam] = useState([])

    // League Data
    const [ leagueUsers, setLeagueUsers] = useState([])
    const [ currentUsersTurn, setCurrentUsersTurn] = useState(null)
    const [ currentFlatPlayers, setCurrentFlatPlayers] =useState([])

    // Logic Gates
    const [ logicGateOne, setLogicGateOne] = useState(true)
    const [ logicGateTwo, setLogicGateTwo] = useState(true)


    // Route to grab info from the api

    // useEffect(() => {
    //     axios.get('/api/team').then(response => {
    //         console.log(response)
    //     })
    // }, [])

    useEffect(() => {
        const interval = setInterval(() => {
          axios.get(`/user/draft/${props.user.league}`).then(response => {
            // grabusers array from backend and push it into state
            setLeagueUsers(response.data)
            setLogicGateOne(true)

            let myToBeFlatArray = []
            // make array of already choosen players
            response.data.forEach((ele) => {
                ele.team.forEach((ele) => {
                    console.log('ele',ele)
                    myToBeFlatArray.push(ele.player_name)
                })
            })
            console.log('my To Be Flat Array', myToBeFlatArray)
            let flattenedArrayOfPlayers = myToBeFlatArray.flat()
            setCurrentFlatPlayers(flattenedArrayOfPlayers)
        })
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        axios.get(`/api/currentplayers/${props.user._id}`).then(response => {
            setPlayers(response.data)
        })
        axios.get(`/user/draft/${props.user.league}`).then(response => {
            // grabusers array from backend and push it into state
            setLeagueUsers(response.data)
            setLogicGateOne(true)
        })
    },[currentTeam])

    useEffect(() => {
        axios.get(`/team/current/${props.user._id}`).then(response => {
            setCurrentTeam(response.data)
        })
    },[])

    // useEffect(() => {
        
    // }, [currentTeam])

    // Select one player from list
    let handleClick = (event, ele) => {
        setPlayer(ele)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        var currentArray;
        if (currentTeam.length > 0) {
            currentArray = [...currentTeam]
        } else {
            currentArray = []
        }
        console.log(props.user)
        axios.post('/team/add', {userId: props.user._id, playerId: event.target.playerId.value}).then( response => {
            currentArray.push(response.data)
            setCurrentTeam(currentArray)
        })
    }

    // setting current team
    var selectedTeam;
    if (currentTeam) {
        selectedTeam = currentTeam.map((ele, id) => (<p key={id} className='player'>{ele.player_name}</p>))
    } else {
        selectedTeam = ''
    }

    // ---------------------------------- conditional selection process ------------------------ //
    if (leagueUsers && logicGateOne) {
        let myArray = [];
        leagueUsers.forEach((ele) => {
            if (ele.turn === true) {
                myArray.push(ele)
            }
        })
        setCurrentUsersTurn(myArray[0])
        setLogicGateOne(false)
    }

    var currUsrTurn;
    if (currentUsersTurn) {
        console.log('--------------------- current users turn', currentUsersTurn.name)
        currUsrTurn = (
            <h1>{currentUsersTurn.name}</h1>
        )
    } else {
        currUsrTurn = (
            <h1>all players selected</h1>
        ) 
    }

    // set one player for viewing purposes
    var singlePlayer;
    if (player) {
        singlePlayer = (
            <>
                <h1>{player.player_name}</h1>
                <h3>Age: {player.age}</h3>
                <h3>Position: {player.position}</h3>
                <h3>Current Rating: {player.rating}</h3>
                <br />
                <h3>This Season:</h3>
                    <p>Games Played: {player.games.appearences}</p>
                    <p>Minutes Played: {player.games.minutes_played}</p>
                    <p>Games Started: {player.games.lineups}</p>
                    <br />
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="playerId" value={player.player_id}/>
                    <input type="submit" value="Add to Team"/>
                </form>
            </>
        )
    } else {
        singlePlayer = ''
    }

    // makes row of players on the left
    var playerRow;
    if (players && currentFlatPlayers) {
        let arrayOfPlayersToMap = []
        console.log('currentFlatPlayers', currentFlatPlayers)
        console.log('players', players)
        players.forEach((ele) => {
            if (currentFlatPlayers.includes(ele.player_name)) {
                console.log(ele.player_name)
            } else {
                arrayOfPlayersToMap.push(ele)
            }
        })
        var playerRow = arrayOfPlayersToMap.map((ele, id) => (<p key={id} onClick={(event) => handleClick(event, ele)} className='player'>{ele.player_name}</p>))
    } else {
        playerRow = ''
    }

    return (
        <>
            <div className='navBar'>
                    <nav>
                        <Link to='/'>Welcome</Link>{' | '}
                        <Link to='/formation'>Formation</Link>{' | '}
                        <Link to='/league'>League</Link>{' | '}
                        <Link to='/team'>Team</Link>
                    </nav>
                </div>
            <div className='AppTwo ballPicture'>
                <div className='playerList'>
                    <h1>Players</h1>
                    {playerRow}
                </div>
                <div className='singlePlayer'>
                    {singlePlayer}
                </div>
                <div className='singlePlayer'>
                    <h1>Current Team Selection</h1>
                    {selectedTeam}
                </div>
                <div>
                    {currUsrTurn}
                </div>
            </div>
        </>
    )
}

export default Team;




    // Route to query database




//     age: 31
// birth_country: "Chile"
// birth_date: "19/12/1988"
// birth_place: "Tocopilla"
// captain: 0
// cards: {yellow: 3, yellowred: 0, red: 0}
// dribbles: {attempts: 27, success: 14}
// duels: {total: 135, won: 56}
// firstname: "Alexis Alejandro"
// fouls: {drawn: 18, committed: 14}
// games: {appearences: 20, minutes_played: 877, lineups: 9}
// goals: {total: 1, conceded: 0, assists: 3}
// height: "169 cm"
// injured: null
// lastname: "Sánchez Sánchez"
// league: "Premier League"
// nationality: "Chile"
// number: null
// passes: {total: 285, key: 21, accuracy: 74}
// penalty: {won: 0, commited: 0, success: 0, missed: 0, saved: 0}
// player_id: 910
// player_name: "A. Sánchez"
// position: "Attacker"
// rating: "6.845000"
// season: "2018-2019"
// shots: {total: 17, on: 9}
// substitutes: {in: 11, out: 8, bench: 14}
// tackles: {total: 10, blocks: 0, interceptions: 9}
// team_id: 33
// team_name: "Manchester United"
// weight: "62 kg"