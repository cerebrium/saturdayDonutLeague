import React from 'react';
import { Link } from 'react-router-dom';

function League () {
    return (
        <>
            <div className='navBar'>
                <nav>
                    <Link to='/league'>League</Link>{' | '}
                    <Link to='/formation'>Formation</Link>{' | '}
                    <Link to='/team'>Team</Link>
                </nav>
            </div>
            <div className='App ballPicture'>
                <h1>League</h1>
            </div>
        </>    
    )
}

export default League;