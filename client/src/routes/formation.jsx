import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Formation (props) {

    const [currentTeam, setCurrentTeam] = useState([])
    const [forwards, setForwards] = useState([])
    const [midfielders, setMidfielders] = useState([])
    const [defenders, setDefenders] = useState([])
    const [goalie, setGoalie] = useState([])

    // Grabbing current team for display on the left
    useEffect(() => {
        axios.get(`/team/current/${props.user._id}`).then(response => {
            setCurrentTeam(response.data)
            console.log(response.data)
        })
    },[])

    // setting current team
    var selectedTeam;
    if (currentTeam) {
        selectedTeam = currentTeam.map((ele, id) => (<p key={id} className='player'>{ele.player_name}</p>))
    } else {
        selectedTeam = ''
    }

    // Setting Forwards list
    var selectedTeam;
    if (currentTeam) {
        selectedTeam = currentTeam.map((ele, id) => (<p key={id} className='player'>{ele.player_name}</p>))
    } else {
        selectedTeam = ''
    }

    // Setting Midfielders List
    var selectedTeam;
    if (currentTeam) {
        selectedTeam = currentTeam.map((ele, id) => (<p key={id} className='player'>{ele.player_name}</p>))
    } else {
        selectedTeam = ''
    }

    // Setting Defenders List
    var selectedTeam;
    if (currentTeam) {
        selectedTeam = currentTeam.map((ele, id) => (<p key={id} className='player'>{ele.player_name}</p>))
    } else {
        selectedTeam = ''
    }

    // Setting Goalies
    var selectedTeam;
    if (currentTeam) {
        selectedTeam = currentTeam.map((ele, id) => (<p key={id} className='player'>{ele.player_name}</p>))
    } else {
        selectedTeam = ''
    }

    // Adding Players to state based on their positions
    if (currentTeam) {
        currentTeam.forEach((ele, index) => {
            if (ele.position === 'Midfielder') {
                setMidfielders(ele)
            } else if (ele.position === 'Defender') {
                setDefenders(ele)
            } else if (ele.position === 'Forward') {
                setForwards(ele)
            } else {
                setGoalie(ele)
            }
        })
    } else {
        selectedTeam = ''
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
                    {selectedTeam}
                </div>
                <div className='fieldPositioningBox'>
                    <div className='fieldPicture'>
                        <div className='goalie'>

                        </div>
                        <div className='defenders'>

                        </div>
                        <div className='midfielders'>

                        </div>
                        <div className='forwards'>

                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}

export default Formation;