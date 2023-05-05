import React,{ useState } from 'react';
import './Books.css';
import BookTemplate from '../BookTemplate/BookTemplate';


const Books = ({books,onBookClicked,user}) => {

    const [category, setCategory] = useState('');
    const [authorsearch, setAuthorSearch] = useState('');
    const [titlesearch, setTitleSearch] = useState('');

    let booklist = books;
    
    const onBookClicked2 = (index) =>{
        onBookClicked(index);
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

    const Search = (author, cat, title) => {
        if(cat){
        booklist = booklist.filter((a,index) => {
            if(a.category === category){
                return true;
            }
            else return false;
        })
        }
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
                books.map((book,index) => {
                    return(
                        <BookTemplate key={index} onBookClicked2={onBookClicked2} index={index} cover={book.cover} title={book.title}/>
                    );
                })
            }
            </div>
        </div>
        );
    
}

export default Books;