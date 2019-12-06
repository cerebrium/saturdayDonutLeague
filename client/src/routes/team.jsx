import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Team () {
    return (
        <>
            <div className='navBar'>
                    <nav>
                        <Link to='/league'>League</Link>{' | '}
                        <Link to='/players'>Players</Link>{' | '}
                        <Link to='/team'>Team</Link>
                    </nav>
                </div>
            <div className='App fieldPicture'>
                <h1>Team</h1>
            </div>
        </>
    )
}

export default Team;