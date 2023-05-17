import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ({onRouteChange,onSignout,user,tab_change}) => {
    return(
        <div className ='navigation'>
            <NavLink to='/' className = 'navbuttons'>Home</NavLink>
            <NavLink to='/myProfile' className = 'navbuttons'>My Profile</NavLink>
            <NavLink to='/borrowed' onClick={tab_change} className = 'navbuttons'>Borrowed</NavLink>
            <NavLink to='/requested' onClick={tab_change} className = 'navbuttons'>Requested</NavLink>
            {
                user.role === 'Admin'
                ?   <NavLink to='/reviews' className = 'navbuttons'>Reviews</NavLink>   
                :   <div></div>
            }
            {
                user.role === 'Admin'
                ?   <NavLink to='/user_approve' className = 'navbuttons'>Approve users</NavLink>  
                :   <div></div>
            }
            <p className = 'navbuttons signout' onClick={() => {window.localStorage.clear(); onSignout(); onRouteChange('signin');}}>Sign Out</p>
        </div>
    );
}

export default Navigation;