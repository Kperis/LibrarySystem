import React from 'react';
import './Books.css';
import { NavLink } from 'react-router-dom';

const Books = () => {
    return(
        <div className='book_box'>
            <ul className='book_list'>
                <li className='book'>
                    <NavLink to='/book'>Book1</NavLink>
                </li>
                <li className='book'>
                    <NavLink to='/book'>Book2</NavLink>
                </li>
                <li className='book'>
                    <NavLink to='/book'>Book3</NavLink>
                </li>
                <li className='book'>
                    <NavLink to='/book'>Book4</NavLink>
                </li>
                <li className='book'>
                    <NavLink to='/book'>Book1</NavLink>
                </li>
                <li className='book'>
                    <NavLink to='/book'>Book2</NavLink>
                </li>
                <li className='book'>
                    <NavLink to='/book'>Book3</NavLink>
                </li>
                <li className='book'>
                    <NavLink to='/book'>Book4</NavLink>
                </li>
            </ul>
        </div>
        );
    
}

export default Books;