import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function League (props) {

    // ----------------------------------- State ---------------------------------------- //
    const [leagueName, setLeagueName] = useState('');
    const [userOne, setUserOne] = useState(null);
    const [userTwo, setUserTwo] = useState(null);
    const [teamsInLeague, setTeamsInLeague] = useState('');
    
    // Logic Gates
    const [logicGate, setLogicGate] = useState(false);
    const [logicOneGate, setLogicOneGate] = useState(true);
    const [logicTwoGate, setLogicTwoGate] = useState(true);
    
    // Team One
    const [oneMidfielders, setOneMidfielders] = useState([]);
    const [oneDefenders, setOneDefenders] = useState([]);
    const [oneForwards, setOneForwards] = useState([]);
    const [oneGoalie, setOneGoalie] = useState([]);
    const [teamOneScore, setTeamOneScore] = useState(0);
    const [teamOneScoreCondition, setTeamOneScoreCondition] = useState(0)
    
    // Team Two
    const [twoMidfielders, setTwoMidfielders] = useState([]);
    const [twoDefenders, setTwoDefenders] = useState([]);
    const [twoForwards, setTwoForwards] = useState([]);
    const [twoGoalie, setTwoGoalie] = useState([]);
    const [teamTwoScore, setTeamTwoScore] = useState(0);
    const [teamTwoScoreCondition, setTeamTwoScoreCondition] = useState(0)


    
    // ----------------------------------- Initial Axios Calls ---------------------------------------- //
    useEffect(() => {
        if (props !== null) {
            axios.get(`/user/lname/${props.user._id}`).then(response => {
                setLeagueName(response.data.leagueName)
            })
        }
        setLogicGate(true)
    }, [])
    
    // ----------------------------------- FUNCTIONS ---------------------------------------- //
    // Handle submit on initial form
    var handleSubmit = (event) => {
        event.preventDefault()
        setLeagueName(event.target.leagueName.value)
        axios.post(`/user/addlname/${props.user._id}`, {leaguename: event.target.leagueName.value}).then(response => {
        })
    }

    // ----------------------------------- SORTING FUNCTION ONE------------------------------------//
    function sortOne(teamOne) {
        var tempmid = []
        var tempdef = []
        var tempfor = []
        var tempgol = []
        
        
        teamOne.forEach((ele, index) => {
            if (ele.position === 'Midfielder') {
                tempmid.push(ele.player_name)
            } else if (ele.position === 'Defender') {
                tempdef.push(ele.player_name)
            } else if (ele.position === 'Attacker') {
                tempfor.push(ele.player_name)
            } else {
                tempgol.push(ele.player_name)
            }
        })
        
        // Set state for playing players
        setOneMidfielders(tempmid)
        setOneDefenders(tempdef)
        setOneForwards(tempfor)
        setOneGoalie(tempgol)
    }
    
    // ----------------------------------- SORTING FUNCTION TWO------------------------------------//
    function sortTwo(teamTwo) {
        var tempmid = []
        var tempdef = []
        var tempfor = []
        var tempgol = []
        
        
        teamTwo.forEach((ele, index) => {
            if (ele.position === 'Midfielder') {
                tempmid.push(ele.player_name)
            } else if (ele.position === 'Defender') {
                tempdef.push(ele.player_name)
            } else if (ele.position === 'Attacker') {
                tempfor.push(ele.player_name)
            } else {
                tempgol.push(ele.player_name)
            }
        })

        // Set state for playing players
        setTwoMidfielders(tempmid)
        setTwoDefenders(tempdef)
        setTwoForwards(tempfor)
        setTwoGoalie(tempgol)
    }

    // ----------------------------------- CONDITIONAL GRABBING OF LEAGUE DATA ---------------------------------------- //
    if (logicGate && leagueName) {
        axios.get(`/user/lnames/allnames/${leagueName}`).then(response => {
            if (response.data.length > 1) {
                console.log(response.data)
                sortOne(response.data[0].startingEleven)
                sortTwo(response.data[1].startingEleven)
                setUserOne(response.data[0])
                setUserTwo(response.data[1])
            }
        })
        setLogicGate(false)
    }
    // ----------------------------------- CONDITIONAL GRABBING OF TEAM SCORE ---------------------------------------- //
    if (userOne && logicOneGate) {
        var score = 0;
        userOne.startingEleven.forEach((ele) => {
            if (ele.rating) {
                score += parseInt(ele.rating)
            }
        })
        setTeamOneScore(score)
        setLogicOneGate(false)
    }    

    if (userTwo && logicTwoGate) {
        var score = 0;
        userTwo.startingEleven.forEach((ele) => {
            if (ele.rating) {
                score += parseInt(ele.rating)
            }
        })
        setTeamTwoScore(score)
        setLogicTwoGate(false)
    }    

    var getScores = (event) => {
        setTeamOneScoreCondition(teamOneScore)
        setTeamTwoScoreCondition(teamTwoScore)
    }

    // Player One Name
    var userOneTitle;
    if (userOne) {
        userOneTitle = (
            <h3>{userOne.name}</h3>
        )    
    } else {
        userOneTitle = 'Player One'
    }

    // Player Two Name
    var userTwoTitle;
    if (userTwo) {
        userTwoTitle = (
            <h3>{userTwo.name}</h3>
        )    
    } else {
        userTwoTitle = 'Player Two'
    }

    // ----------------------------------- CONDITIONAL RENDERING ---------------------------------------- //
    var conditionalLeagueName;
    if (leagueName && userOne && userTwo) {
        // ----------------------------------- ON FIELD CONDITIONAL MAPPING ONE ---------------------------------------- //
        var selectedForwards;
        if (oneForwards) {
            selectedForwards = oneForwards.map((ele, id) => (<p key={id} className='playerForm'>{ele}</p>))
        } else {
            selectedForwards = ''
        }
        
        // Setting Midfielders List
        var selectedMidfielders;
        if (oneMidfielders) {
            selectedMidfielders = oneMidfielders.map((ele, id) => (<p key={id} className='playerForm' >{ele}</p>))
        } else {
            selectedMidfielders = ''
        }
        
        // Setting Defenders List
        var selectedDefenders;
        if (oneDefenders) {
            selectedDefenders = oneDefenders.map((ele, id) => (<p key={id} className='playerForm' >{ele}</p>))
        } else {
            selectedDefenders = ''
        }
        
        // Setting Goalies
        var selectedGoalie;
        if (oneGoalie) {
            selectedGoalie = oneGoalie.map((ele, id) => (<p key={id} className='playerForm' >{ele}</p>))
        } else {
            selectedGoalie = ''
        }

        // ----------------------------------- ON FIELD CONDITIONAL MAPPING TWO ---------------------------------------- //
        var selectedTwoForwards;
        if (twoForwards) {
            selectedTwoForwards = twoForwards.map((ele, id) => (<p key={id} className='playerForm'>{ele}</p>))
        } else {
            selectedTwoForwards = ''
        }
        
        // Setting Midfielders List
        var selectedTwoMidfielders;
        if (twoMidfielders) {
            selectedTwoMidfielders = twoMidfielders.map((ele, id) => (<p key={id} className='playerForm' >{ele}</p>))
        } else {
            selectedTwoMidfielders = ''
        }
        
        // Setting Defenders List
        var selectedTwoDefenders;
        if (twoDefenders) {
            selectedTwoDefenders = twoDefenders.map((ele, id) => (<p key={id} className='playerForm' >{ele}</p>))
        } else {
            selectedTwoDefenders = ''
        }
        
        // Setting Goalies
        var selectedTwoGoalie;
        if (twoGoalie) {
            selectedTwoGoalie = twoGoalie.map((ele, id) => (<p key={id} className='player' >{ele}</p>))
            // selectedTwoGoalie = ''
        } else {
            selectedTwoGoalie = ''
        }
        conditionalLeagueName = (
            <>
                <div className='titlePositionBoxOne'>
                    {userOneTitle}
                </div>
                <div className='fieldPositioningBoxLeft'>
                    <div className='fieldPicture'>
                        <div className='goalie'>
                            {selectedGoalie}
                        </div>
                        <div className='defenders'>
                            {selectedDefenders}
                        </div>
                        <div className='midfielders'>
                            {selectedMidfielders}
                        </div>
                        <div className='forwards'>
                            {selectedForwards}
                        </div>
                    </div>
                    <div className='scoreDiv'>
                        <div className='scores'>
                            <h3>Score:</h3>
                            <h3>{teamOneScoreCondition}</h3>
                        </div>
                    </div>
                </div>  
                <div className='saveTeamButtonPosition'>
                    <button onClick={getScores} className='saveTeamButton'>Play</button>
                </div>
                <div className='titlePositionBoxTwo'>
                    {userTwoTitle}
                </div>
                <div className='fieldPositioningBoxRight'>
                    <div className='fieldPicture'>
                        <div className='goalie'>
                            {selectedTwoGoalie}
                        </div>
                        <div className='defenders'>
                            {selectedTwoDefenders}
                        </div>
                        <div className='midfielders'>
                            {selectedTwoMidfielders}
                        </div>
                        <div className='forwards'>
                            {selectedTwoForwards}
                        </div>
                    </div>
                    <div className='scoreDiv'>
                        <div className='scores'>
                            <h3>Score:</h3>
                            <h3>{teamTwoScoreCondition}</h3>
                        </div>
                    </div>
                </div>  
            </>    
        )
        } else if (leagueName && !userTwo) {
            conditionalLeagueName = (
                <div className='onlyLeagueStyle'>
                    <h1>{leagueName}</h1><br />
                    <h3>Unfortunetly you are the only one in your league... add other people to play!</h3>
                </div>
            )
        } else {
            conditionalLeagueName = (
                <div className='conditionalLeagueName'>
                    <h1>No League Selected</h1><br />
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='leagueName' className='formInput'/><br />
                        <input type="submit" value="Submit League Name" className='submitButton'/>
                    </form>
                </div>
        )    
    }
    return (
        <>
            <div >
                <nav className='navBar'>
                    <Link to='/' className='navLinks'>Welcome</Link>{' | '}
                    <Link to='/formation' className='navLinks'>Formation</Link>{' | '}
                    <Link to='/league' className='navLinks'>League</Link>{' | '}
                    <Link to='/team' className='navLinks'>Team</Link>
                </nav>
            </div>
            <div className='AppTwo ballPicture'>
                {conditionalLeagueName} 
            </div>
        </>    
    )
}

export default League;