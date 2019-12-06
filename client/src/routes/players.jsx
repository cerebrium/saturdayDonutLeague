import React from 'react';
import { Link } from 'react-router-dom'

function Players () {
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
                <h1>Welcome to the player page</h1>
            </div>
        </>
    )
}

export default Players;