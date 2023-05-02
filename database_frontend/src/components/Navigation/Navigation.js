import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return(
        <div className ='navigation'>
            <NavLink to='/home' className = 'navbuttons'>Home</NavLink>
            <NavLink to='/myProfile' className = 'navbuttons'>My Profile</NavLink>
            <NavLink to='/borrowed' className = 'navbuttons'>My Books</NavLink>
            <NavLink to='/requested' className = 'navbuttons'>Requested</NavLink>
            <NavLink to='/signin' className = 'navbuttons signout'>Sign Out</NavLink>
        </div>
    );
}

export default Navigation;