import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function League (props) {

    // ----------------------------------- State ---------------------------------------- //
    const [leagueName, setLeagueName] = useState('');
    const [teamsInLeague, setTeamsInLeague] = useState('');
    
    // ----------------------------------- Initial Axios Calls ---------------------------------------- //
    useEffect(() => {
        if (props !== null) {
            axios.get(`/user/lname/${props.user._id}`).then(response => {
                console.log(response.data.leagueName)
                setLeagueName(response.data.leagueName)
            })
        }
    }, [])
    
    // ----------------------------------- FUNCTIONS ---------------------------------------- //
    // Handle submit on initial form
    var handleSubmit = (event) => {
        event.preventDefault()
        setLeagueName(event.target.leagueName.value)
        axios.post(`/user/addlname/${props.user._id}`, {leaguename: event.target.leagueName.value}).then(response => {
            console.log(response.data)
        })
    }

    // ----------------------------------- CONDITIONAL GRABBING OF LEAGUE DATA ---------------------------------------- //
    if (leagueName) {
        useEffect(() => {
            axios.get('/user/lname/allnames').then(response => {
                console.log(response.data)
            })
        }, [])
    }

    // ----------------------------------- CONDITIONAL RENDERING ---------------------------------------- //
    var conditionalLeagueName;
    if (leagueName) {
        conditionalLeagueName = (
            <h1>{leagueName}</h1>
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
            <div className='navBar'>
                <nav>
                    <Link to='/'>Welcome</Link>{' | '}
                    <Link to='/formation'>Formation</Link>{' | '}
                    <Link to='/league'>League</Link>{' | '}
                    <Link to='/team'>Team</Link>
                </nav>
            </div>
            <div className='AppTwo ballPicture'>
                {conditionalLeagueName}
            </div>
        </>    
    )
}

export default League;