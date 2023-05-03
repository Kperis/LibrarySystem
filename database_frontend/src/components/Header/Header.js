import React from 'react';
import './Header.css';

const Header = ({first_name,last_name,school}) => {
    return(
        <div className ='header'>
            <h1 className='welcome_text'>{`${first_name} ${last_name}, welcome back to ${school} school library. Feel free to browse our book collection!`}</h1>
        </div>
    );
}

export default Header;