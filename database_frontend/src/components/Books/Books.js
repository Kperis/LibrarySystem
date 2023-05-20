import React,{ useEffect, useState } from 'react';
import './Books.css';
import BookTemplate from '../BookTemplate/BookTemplate';


const Books = ({books,onBookClicked,user,isonrequest,update_count,count2}) => {

    const [category, setCategory] = useState('All');
    const [authorsearch, setAuthorSearch] = useState('');
    const [titlesearch, setTitleSearch] = useState('');
    const [booklist,setBooklist] = useState([]);

    useEffect(() =>{
        let temp = books.filter(book => {
            return book.title.toLowerCase().includes(titlesearch.toLowerCase()) && book.authors.some(author => {return author[0].toLowerCase().includes(authorsearch.toLowerCase())});
        })
        setBooklist(temp);
    },[titlesearch,books,authorsearch,count2])

    const onBookClicked2 = (isbn) =>{
        onBookClicked(isbn);
        
    }

    const onCategorySelect = (event) => {
        setCategory(event.target.value);
    }

    const onAuthorSearch = (event) => {
        setAuthorSearch(event.target.value);
    }

    const onTitleSearch = (event) => {
        setTitleSearch(event.target.value);
    }

    const onCancelRequest = (index) =>{
        let role = 'ho'
        if(user?.role === 'Admin'){
            role = 'Admin';
        }
        else{
            role = 'student';
        } 
        let isbn = books[index].isbn;
        fetch('http://localhost:5000/request', {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                role: role,
                username: user.username,
                isbn: isbn
            })
        })
        .then(response => response.json())
        .then(data => update_count())

        

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
                        <div key={book.isbn}>
                            <BookTemplate onBookClicked2={onBookClicked2} index={index} isbn={book.isbn} cover={book.cover_m} authors={book?.authors} title={book.title}/>
                        
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