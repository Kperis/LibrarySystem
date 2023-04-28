import React from 'react';
import './Navigation.css';

const Navigation = () => {
    return(
        <div className ='navigation'>
            <p className = 'navbuttons'>Home</p>
            <p className = 'navbuttons'>My Profile</p>
            <p className = 'navbuttons'>My Books</p>
            <p className = 'navbuttons'>Requested</p>
            <p className = 'navbuttons signout'>Sign Out</p>
        </div>
    );
}

export default Navigation;