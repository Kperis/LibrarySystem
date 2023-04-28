import React from 'react';
import './Books.css';

const Books = () => {
    return(
        <div className='book_box'>
            <ul className='book_list'>
                <li className='book'>
                    <p>Book1</p>
                </li>
                <li className='book'>
                    <p>Book2</p>
                </li>
                <li className='book'>
                    <p>Book3</p>
                </li>
                <li className='book'>
                    <p>Book4</p>
                </li>
                <li className='book'>
                    <p>Book1</p>
                </li>
                <li className='book'>
                    <p>Book2</p>
                </li>
                <li className='book'>
                    <p>Book3</p>
                </li>
                <li className='book'>
                    <p>Book4</p>
                </li>
            </ul>
        </div>
        );
    
}

export default Books;