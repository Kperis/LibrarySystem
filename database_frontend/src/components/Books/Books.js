import React,{ useEffect, useState } from 'react';
import './Books.css';
import BookTemplate from '../BookTemplate/BookTemplate';


const Books = ({books,onBookClicked,user,isonrequest,update_count}) => {

    const [category, setCategory] = useState('All');
    const [authorsearch, setAuthorSearch] = useState('');
    const [titlesearch, setTitleSearch] = useState('');
    const [booklist,setBooklist] = useState([]);

    useEffect(() =>{
        let temp = books.filter(book => {
            return book.title.toLowerCase().includes(titlesearch.toLowerCase());
        })
        setBooklist(temp);   
    },[titlesearch,books])
    

    const onBookClicked2 = (index) =>{
        onBookClicked(index);
    }

    const onCategorySelect = (event) => {
        setCategory(event.target.value);
        Search();
    }

    const onAuthorSearch = (event) => {
        setAuthorSearch(event.target.value);
        Search();
    }

    const onTitleSearch = (event) => {
        setTitleSearch(event.target.value);
    }


    const Search = () => {
        console.log(titlesearch);
        booklist = books.filter(book => {
            return book.title.toLowerCase().includes(titlesearch.toLowerCase());
        })    
        return;
        // booklist = books.filter(book =>{
        //     return book.author.toLowerCase().includes(authorsearch.toLowerCase());

        // })
    }

    const onCancelRequest = async (index) =>{
        let isbn = books[index].isbn;
        await fetch('http://localhost:5000/request', {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                isbn: isbn
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))

        update_count();

    }
    

    return(
        <div className='book_box'>
            <div className='searchspace'>
                <input className='searchbox' onChange={onTitleSearch} type='text' placeholder='Title..'/>
                <input className='searchbox' onChange={onAuthorSearch} type='text' placeholder='Author..'/>
                <select className='search_cat' onChange={onCategorySelect}> 
                    <option value='' >All</option>
                    <option value='Fantasy' >Fantasy</option>
                    <option value='Sci-fi' >Sci-fi</option>
                    <option value='Romance' >Romance</option>
                    <option value='Mystery' >Mystery</option>
                    <option value='Drama' >Drama</option>
                    <option value='Action' >Action</option>
                    <option value='Historical' >Historical</option>
                </select>
            </div>
            <div className='book_list'>
                {
                booklist.map((book,index) => {
                    return(
                        <div>
                            <BookTemplate key={book.title} onBookClicked2={onBookClicked2} index={index} cover={book.cover_m}  title={book.title}/>
                        
                            {
                                isonrequest === true
                                ?   <div>
                                        <button className='cancel_request' onClick={()=>{ onCancelRequest(index);} } >Cancel Request</button>
                                    </div>
                                
                                :   <div>

                                    </div>
                            
                            }
                        </div>
                    );
                })
                }

            </div>
            
            
            
        </div>
        );
    
}

export default Books;