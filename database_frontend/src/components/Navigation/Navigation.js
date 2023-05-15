import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ({onRouteChange,onSignout,user}) => {
    return(
        <div className ='navigation'>
            <NavLink to='/' className = 'navbuttons'>Home</NavLink>
            <NavLink to='/myProfile' className = 'navbuttons'>My Profile</NavLink>
            <NavLink to='/borrowed' className = 'navbuttons'>Borrowed</NavLink>
            <NavLink to='/requested' className = 'navbuttons'>Requested</NavLink>
            {
                user.role === 'Admin'
                ?   <NavLink to='/reviews' className = 'navbuttons'>Reviews</NavLink>   
                :   <div></div>
            }
            <p className = 'navbuttons signout' onClick={() => {window.localStorage.clear(); onSignout(); onRouteChange('signin');}}>Sign Out</p>
        </div>
    );
}

export default Navigation;