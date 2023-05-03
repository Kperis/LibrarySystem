import React from 'react';
import './Book.css';

const Book = ({book}) =>{
    return(
        <div>
            <h1 className='book_title'>{`${book.title}`}</h1>
            <div className='book_info'>
                <img src={`${book.cover}`} width='400px' height='700px'/> 
                <ul className='book_details'>
                    <li className='description'>
                        <p>Summary: Lorem ipsum sfhanjafnib  nda osjnjdnj afjn ajn f daudj names
                            ssnfjfdnsjnjvjfjjjnvjadfjuaf uh fua uf vha 
                        </p>
                    </li>
                    <li className='rest'>
                        <p>hot, amogus, sex</p>
                    </li>
                    <li className='rest'>
                        <p>Author(s): Brandon Sanserson</p>
                    </li>
                    <li className='rest'>
                        <p>{`Categories: ${book.category}`}</p>
                    </li>
                    <li className='review_container'>
                        <h3 className='review_header'>Reviews</h3>
                        <ul className='review_container'>
                            <span className='review_header'>Strongly Dislike</span>
                            <li><input type='radio' name='likert' value='0'/></li>
                            <li><input type='radio' name='likert' value='1'/></li>
                            <li><input type='radio' name='likert' value='2'/></li>
                            <li><input type='radio' name='likert' value='3'/></li>
                            <li><input type='radio' name='likert' value='4'/></li>
                            <span className='review_header'>Strongly Like</span>
                        </ul>
                        <div>
                            <input className='review_description' type='text' />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Book;