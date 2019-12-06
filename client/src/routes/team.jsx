import React, { useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';




function Team () {

    useEffect(() => {
        axios.get('/api/team').then(response => {
            console.log(response)
        })
    }, [])
    
    return (
        <>
            <div className='navBar'>
                    <nav>
                        <Link to='/league'>League</Link>{' | '}
                        <Link to='/players'>Players</Link>{' | '}
                        <Link to='/team'>Team</Link>
                    </nav>
                </div>
            <div className='App ballPicture'>
                <h1>Team</h1>
            </div>
        </>
    )
}

export default Team;