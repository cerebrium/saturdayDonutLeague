import React from 'react';
import { Link } from 'react-router-dom';

function Logout () {
    return (
        <>
            <div className='navBar'>
                    <nav>
                        <Link to='/league'>League</Link>{' | '}
                        <Link to='/players'>Players</Link>{' | '}
                        <Link to='/team'>Team</Link>
                    </nav>
                </div>
            <h1>logout</h1>
        </>
    )
}

export default Logout