import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function Logout () {
    return (
        <>
            <div >
                <nav className='navBar'>
                    <Link to='/' className='navLinks'>Welcome</Link>{' | '}
                    <Link to='/formation' className='navLinks'>Formation</Link>{' | '}
                    <Link to='/league' className='navLinks'>League</Link>{' | '}
                    <Link to='/team' className='navLinks'>Team</Link>
                </nav>
            </div>
            <h1>logout</h1>
        </>
    )
}

export default Logout