import React,{ useEffect, useState } from 'react';
import './Books.css';
import BookTemplate from '../BookTemplate/BookTemplate';
import { NavLink } from 'react-router-dom';



const Books = ({activeBook,books,onBookClicked}) => {
    
    const onBookClicked2 = (index) =>{
        onBookClicked(index);
    }

    return(
        <div className='book_box'>
            <div className='book_list'>
                {
                books.map((book,index) => {
                    return(
                        <BookTemplate key={index} onBookClicked2={onBookClicked2} index={index} cover={book.cover} title={book.title}/>
                    );
                })
            }
            </div>
            
            
            
            {/* <ul className='book_list'>
                <li className='book'>
                    <NavLink onClick={() => onBookClicked()} to='/book'><img className='book_cover' src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a0c39048873339.58a470c427a06.jpg' width='260px' height='420px'/></NavLink>
                    <span className='book_title'>hot</span>
                </li>
                <li className='book'>
                    <NavLink onClick={() => onBookClicked('hi2')} to='/book'><img className='book_cover' src='https://images.squarespace-cdn.com/content/v1/5c71c7d8aadd342945360ba1/1586723509001-E5NQB7VLS1R9NS0EOSOM/Harry+Potter+and+the+Philosopher%27s+Stone+Original+Children%27s+Edition+Cover.jpg' width='260px' height='420px'/></NavLink>
                    <span className='book_title'>amogus</span>
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
            </ul> */}
        </div>
        );
    
}

export default Books;