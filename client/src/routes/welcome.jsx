import React from 'react';
import { Link } from 'react-router-dom';

function Logout () {
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
            <div className='App donutPicture'>
                <h1>Saturday Donut League: Fantasy Futbol with your Friends</h1>
            </div>
        </>
    )
}

export default Logout