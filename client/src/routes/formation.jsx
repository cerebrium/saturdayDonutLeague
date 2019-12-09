import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Formation (props) {

    // ---------------------------- STATE -----------------------------------
    // Grab all the players possible
    const [currentTeam, setCurrentTeam] = useState([])

    // All the players currently on the field
    const [forwards, setForwards] = useState([])
    const [midfielders, setMidfielders] = useState([])
    const [defenders, setDefenders] = useState([])
    const [goalie, setGoalie] = useState([])

    // All the players on the bench
    const [benchForwards, setBenchForwards] = useState([])
    const [benchMidfielders, setBenchMidfielders] = useState([])
    const [benchDefenders, setBenchDefenders] = useState([])
    const [benchGoalie, setBenchGoalie] = useState([])

    // gate for not having infinite loop
    const [myGate, setMyGate] = useState(false)

    //

    // ------------------------------- FUNCTIONS -----------------------------------

    // Grabbing current team for display on the left
    useEffect(() => {
        axios.get(`/team/current/${props.user._id}`).then(response => {
            setCurrentTeam(response.data)
            setMyGate(true)
        })
    },[])

    // Replace player in lineup with player on team
    var handleClick = (event) => {
        event.preventDefault()
        console.log('we in the wilds now bruh')
    }

    
    // setting current team
    var selectedTeam;
    if (currentTeam) {
        selectedTeam = currentTeam.map((ele, id) => (<p key={id} className='player'>{ele.player_name}</p>))
    } else {
        selectedTeam = ''
    }
    
    // Adding Players to state based on their positions
    function sort() {
        if (currentTeam && myGate) {
            // On Field Players
            var tempmid = [...midfielders];
            var tempdef = [...defenders];
            var tempfor = [...forwards];
            var tempgol = [...goalie];

            // On Bench Player
            var benchTempmid = [...benchMidfielders];
            var benchTempdef = [...benchDefenders];
            var benchTempfor = [...benchForwards];
            var benchTempgol = [...benchGoalie];
            currentTeam.forEach((ele, index) => {
                if (ele.position === 'Midfielder') {
                    if (tempmid.length < 4) {
                        tempmid.push(ele)
                    } else {
                        benchTempmid.push(ele)
                    } 
                } else if (ele.position === 'Defender') {
                    if (tempdef.length < 4) {
                        tempdef.push(ele)
                    } else {
                        benchTempdef.push(ele)
                    } 
                } else if (ele.position === 'Attacker') {
                    if (tempfor.length < 2) {
                        tempfor.push(ele)
                    } else {
                        benchTempfor.push(ele)
                    } 
                } else {
                    if (tempgol.length < 1) {
                        tempgol.push(ele)
                    } else {
                        benchTempgol.push(ele)
                    } 
                }
            })
            // Set state for playing players
            setMidfielders(tempmid)
            setDefenders(tempdef)
            setForwards(tempfor)
            setGoalie(tempgol)

            // Set State for non-playin players
            setBenchMidfielders(benchTempmid)
            setBenchDefenders(benchTempdef)
            setBenchForwards(benchTempfor)
            setBenchGoalie(benchTempgol)
        }
    }

    // if conditional to limit rendering
    if (myGate === true) {
        sort()
        setMyGate(false)
    }

    // ----------------------- ON FIELD CONDITIONAL MAPPPING ------------------
    // Setting Forwards list
    var selectedForwards;
    if (forwards) {
        selectedForwards = forwards.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedForwards = ''
    }
    
    // Setting Midfielders List
    var selectedMidfielders;
    if (midfielders) {
        selectedMidfielders = midfielders.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedMidfielders = ''
    }
    
    // Setting Defenders List
    var selectedDefenders;
    if (defenders) {
        selectedDefenders = defenders.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedDefenders = ''
    }
    
    // Setting Goalies
    var selectedGoalie;
    if (goalie) {
        console.log(goalie)
        selectedGoalie = goalie.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedGoalie = ''
    }
    
    // ----------------------- OFF FIELD CONDITIONAL MAPPPING ------------------
    // Setting Forwards list
    var selectedBenchForwards;
    if (benchForwards) {
        console.log(forwards)
        selectedBenchForwards = benchForwards.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedBenchForwards = ''
    }
    
    // Setting Midfielders List
    var selectedBenchMidfielders;
    if (benchMidfielders) {
        selectedBenchMidfielders = benchMidfielders.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedBenchMidfielders = ''
    }
    
    // Setting Defenders List
    var selectedBenchDefenders;
    if (benchDefenders) {
        selectedBenchDefenders = benchDefenders.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedBenchDefenders = ''
    }
    
    // Setting Goalies
    var selectedBenchGoalie;
    if (benchGoalie) {
        console.log(goalie)
        selectedBenchGoalie = benchGoalie.map((ele, id) => (<p key={id} className='player' onClick={handleClick}>{ele.player_name}</p>))
    } else {
        selectedBenchGoalie = ''
    }


    return (
        <>
            <div className='navBar'>
                <nav>
                    <Link to='/'>League</Link>{' | '}
                    <Link to='/formation'>Formation</Link>{' | '}
                    <Link to='/team'>Team</Link>
                </nav>
            </div>
            <div className='AppTwo ballPicture'>
                <div className='playerList'>
                    <h2>Substitutes</h2>
                    <h3>Forwards</h3>
                    {selectedBenchForwards}
                    <br />
                    <h3>Midfielders</h3>
                    {selectedBenchMidfielders}
                    <br />
                    <h3>Defenders</h3>
                    {selectedBenchDefenders}
                    <br />
                    <h3>Goalies</h3>
                    {selectedBenchGoalie}
                </div>
                <div className='fieldPositioningBox'>
                    <div className='fieldPicture'>
                        <div className='goalie'>
                            {selectedGoalie[0]}
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
                </div>
            </div>    
        </>
    )
}

export default Formation;