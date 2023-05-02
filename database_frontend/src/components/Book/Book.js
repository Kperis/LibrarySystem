import React from 'react';
import './Book.css';

const Book = () =>{
    return(
        <div>
            <h1 className='book_title'>TITLE</h1>
            <div className='book_info'>
                <img src='https://static.wikia.nocookie.net/wot/images/0/0c/Rand.jpg' width='400px' height='700px'/> 
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
                        <p>Categories: tsonta</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Book;