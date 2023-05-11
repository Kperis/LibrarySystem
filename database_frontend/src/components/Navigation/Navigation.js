import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ({onRouteChange,temp}) => {
    return(
        <div className ='navigation'>
            <NavLink to='/' className = 'navbuttons'>Home</NavLink>
            <NavLink to='/myProfile' className = 'navbuttons' onClick={() => temp()} >My Profile</NavLink>
            <NavLink to='/borrowed' className = 'navbuttons'>Borrowed</NavLink>
            <NavLink to='/requested' className = 'navbuttons'>Requested</NavLink>
            <p to='/signin' className = 'navbuttons signout' onClick={() => onRouteChange('signin')}>Sign Out</p>
        </div>
    );
}

export default Navigation;