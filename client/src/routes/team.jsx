import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';




function Team () {

    const [ players, setPlayers] = useState([])

    // Route to grab info from the api

    // useEffect(() => {
    //     axios.get('/api/team').then(response => {
    //         console.log(response)
    //     })
    // }, [])

    // Route to query database

    useEffect(() => {
        axios.get('/api/currentplayers').then(response => {
            setPlayers(response.data)
            console.log('response.data', response.data)
            console.log('players', players)
        })
    },[])


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