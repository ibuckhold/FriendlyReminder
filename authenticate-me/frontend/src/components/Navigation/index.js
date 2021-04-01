import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {

    function handleLogin() {
        <Redirect to="/login" />
    }

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='buttons'>
                <button onClick={handleLogin} className='btn' to="/login">Log In</button>
                <button className='btn' to="/signup">Sign Up</button>
            </div>
        );
    }

    return (
        <div className='nav'>
            <ul>
                <i exact to="/" className='logo fas fa-hands-helping'></i>
                <span className='logoName'>Friendly Reminder</span>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;
