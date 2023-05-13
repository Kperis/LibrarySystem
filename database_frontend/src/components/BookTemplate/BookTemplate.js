import React from 'react';
import './BookTemplate.css';
import { NavLink } from 'react-router-dom';

const BookTemplate = ({onBookClicked2,index,title,cover,isbn}) => {


    return(
        <div>
            <NavLink onClick={() => onBookClicked2(isbn)} to='/book'><img alt='' className='book_cover' src={`${cover}`} width='260px' height='420px'/></NavLink>
            <span className='book_title'>{`${title}`}</span>
        </div>
    );
}

export default BookTemplate;