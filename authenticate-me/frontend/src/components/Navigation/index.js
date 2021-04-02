import React from 'react';
// import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {

    function handleLogin() {
        window.location = '/login';
    }
    function handleSignup() {
        window.location = '/signup';
    }

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div className='buttons'>
                    <button onClick={handleLogin} className='btn'>Log In</button>
                    <button onClick={handleSignup} className='btn'>Sign Up</button>
                </div>
            </>
        );
    }

    return (
        <div className='nav'>
            <ul>
                <a href="/me">
                    <div className='logo fas fa-hands-helping' />
                    <span className='logoName'>Friendly Reminder</span>
                </a>
                {isLoaded && sessionLinks}
            </ul>
            <div>
                <a href='/lists/create'>
                    <div className="listCreate fas fa-folder-plus" />
                    <span className='listCreate'>Create a list</span>
                </a>
            </div>
            <div>
                <a href='/tasks/create'>
                    <div className="taskCreate fas fa-plus" />
                    <span className='taskCreate'>Create a task</span>
                </a>
            </div>
        </div>
    );
}

export default Navigation;
