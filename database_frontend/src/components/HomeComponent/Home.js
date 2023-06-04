import React,{ useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Book from '../Book/Book';
import { Routes, Route } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import Admin from '../AdminCompononent/Admin';
import ReviewList from '../ReviewList/ReviewList';
import Approve from '../Approve/Approve';
import './Home.css';




const Home = ({user, onRouteChange,onSignout}) => {

    const [books,setBooks] = useState([]);
    const [borrowed,setBorrowed] = useState([]);
    const [requested,setRequested] = useState([]);
    const [count,setCount] = useState(0);
    const [count2,setCount2] = useState(0);
    const [should_load,setShouldLoad] = useState(false);
    const [should_load2,setShouldLoad2] = useState(false);
    const [book_edit,setBookEdit] = useState(false);
    const [editMode,setEditMode] = useState(false);
    const [editTitle,setEditTitle] = useState('');
    const [editSummary,setEditSummary] = useState('');
    const [editAuthors,setEditAuthors] = useState([]);
    const [editKeywords,setEditKeywords] = useState([]);
    const [editCover,setEditCover] = useState('');
    const [editCategories,setEditCategories] = useState([]);
    const [editPublisher,setEditPublisher] = useState('');
    const [editCopies,setEditCopies] = useState(0);
    const [editIsbn,setEditIsbn] = useState(0);
    const [editPageCount,setEditPageCount] = useState(0);
    const [banMode,setBanMode] = useState(false);
 
    const checkList = ['Fantasy','Sci-fi','Romance','Mystery','Drama','Action','Historical'];

    useEffect(() => {
        fetchOther();  
    }, [count,should_load2])

    useEffect(()=>{
        fetchBooks();
    },[book_edit])

    const fetchBooks = () =>{
        fetch('http://localhost:5000/books',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                school_name: user.school_name,
                city: user.city 
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.books === 'none'){
                setBooks([]);
            }
            else{
                setBooks(data);
            }
            setShouldLoad2(true);
        })
        .catch(err => console.log(err));
    }

   
    const fetchOther = () => {
        if(should_load2){
            let role = 'ho'
            if(user?.role === 'Admin'){
                role = 'Admin';
            }
            else{
                role = 'student';
            } 

            fetch('http://localhost:5000/borrow', {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    role: role,
                    username: user?.username
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data?.borrows === 'none'){
                    setBorrowed([]);
                }
                else{
                    setBorrowed(data);
                    console.log('lol');
                }
                
                fetch('http://localhost:5000/request', {
                    method: 'post',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        role: role,
                        username: user?.username
                    })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data?.requests === 'none'){
                            setRequested([]);
                        }
                        else{
                            setRequested(data);
                        }
                        setShouldLoad(true);
            })
            })
    }
        
    }

    const update_request_count = () =>{
        setCount(count+1);
    }

    const onBookClicked = (isbn) => {
        let temp = books.filter(a =>{
            return a.isbn === isbn
        });
        window.localStorage.setItem("book",JSON.stringify(temp[0]));
    }

    const checkboxed = (event) =>{
        let updatedList = [...editCategories];
        if(event.target.checked){
            updatedList = [...editCategories,event.target.value];
        }
        else{
            updatedList.splice(editCategories.indexOf(event.target.value),1);
        }
        setEditCategories(updatedList);
    }


    const tab_change = () =>{
        setCount2(count2+1);
    }

    const tab_approve_change = (bool) =>{
        if(bool){
            setBanMode(true);
        }
        else{
            setBanMode(false);
        }
    }

    const editBook = ()=>{
        setBookEdit(!book_edit);
    }

    const onAddBook = () =>{
        setEditMode(true);
    }

    const onEditSummary = (event)=>{
        setEditSummary(event.target.value);
    }

    const onEditCover = (event)=>{
        setEditCover(event.target.value);
    }

    const onEditKeywords = (event)=>{
        setEditKeywords(event.target.value.split(','));
    }

    const onEditAuthors = (event)=>{
        setEditAuthors(event.target.value.split(','));
    }

    const onEditTitle = (event)=>{
        setEditTitle(event.target.value);
    }

    const onEditPublisher = (event) =>{
        setEditPublisher(event.target.value);
    }

    const onEditCopies = (event) =>{
        setEditCopies(Number(event.target.value));
    }

    const onEditPageCount = (event) =>{
        setEditPageCount(Number(event.target.value));
    }

    const onEditIsbn = (event) =>{
        setEditIsbn(Number(event.target.value));
    }

    const onCancelBook= () =>{
        setEditAuthors([]);
        setEditCategories([]);
        setEditCover('');
        setEditSummary('');
        setEditTitle('');
        setEditKeywords([]);
        setEditPublisher('');
        setEditCopies(0);
        setEditIsbn(0);
        setEditPageCount(0);
        setEditMode(false);
    }


    const onSubmitBook = () =>{
        if(editAuthors.length > 0 && editCategories.length > 0 && editKeywords.length > 0 && editCover !== '' && editTitle !== '' && editSummary !== '' && editPublisher !== ''){
            fetch('http://localhost:5000/edit_book', {
                        method: 'post',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({
                            title: editTitle,
                            summary: editSummary,
                            cover:editCover,
                            keywords: editKeywords,
                            authors: editAuthors,
                            categories: editCategories,
                            publisher: editPublisher,
                            copies: editCopies,
                            page_count: editPageCount,
                            isbn: editIsbn,
                            username: user.username
                        })
                    })
                    .then(response => response.json())
                    .then(data =>  {
                        if(data.book === 'existed'){
                            editBook();
                            onCancelBook();
                            alert('Book already exists in database. Imported in school library. If you wish to edit info then select book and hit edit.')
                        }
                        else{
                            editBook();
                            onCancelBook();
                        }
                        
                    })
        }
        else{
            alert('Fill everything properly')
        }
    }


    return(
            <>
                <Navigation onRouteChange={onRouteChange} onSignout={onSignout} user={user} tab_change={tab_change} tab_approve_change={tab_approve_change}/>
                <Routes>
                    <Route path='/' element={
                        <div>
                            <Header first_name={user.first_name} last_name={user.last_name} school={user.school_name}/>
                            <Books count2={count2} books={books} user={user} onBookClicked={onBookClicked} isonrequest={false} update_count={update_request_count}/>
                            {user.role === 'Admin'
                            ?   (!editMode
                                ?   <button className='add_book' onClick={()=> onAddBook()}>Add Book</button>
                                :   <div className='edit_info'>
                                        <input placeholder='Insert title...' onChange={onEditTitle}/>
                                        <input placeholder='Insert cover url...' onChange={onEditCover}/>
                                        <input placeholder='Insert short summary...' onChange={onEditSummary}/>
                                        <input placeholder='Insert a few keywords...' onChange={onEditKeywords}/>
                                        <input placeholder='Insert Author(s) name...' onChange={onEditAuthors}/> 
                                        <div>
                                            {
                                                checkList.map((element,index)=>(
                                                    <div key={index} className='checkboxes'>
                                                        <input type='checkbox' value={element} onChange={checkboxed}/>
                                                        <label>{element}</label>
                                                    </div>
                                                )
                                                )
                                            }
                                        </div>
                                        <input placeholder='Insert publisher...' onChange={onEditPublisher}/>
                                        <input placeholder='Insert copies...' onChange={onEditCopies}/>
                                        <input placeholder='Insert isbn...' onChange={onEditIsbn}/>
                                        <input placeholder='Insert Page count ...' onChange={onEditPageCount}/>
                                        <button onClick={() => onSubmitBook()}>Submit</button>
                                        <button onClick={()=> onCancelBook()}>Cancel</button>
                                    </div>
                                )
                            :   <div></div>
                            }
                        </div>
                    } />
                    <Route path="/book" element={
                        <Book editBook={editBook} should_load={should_load} requested={requested} update_count={update_request_count} borrowed={borrowed} />
                    } />
                    <Route path='/myProfile' element={
                        <UserInfo user={user}/>
                    }/>
                    <Route path='/borrowed' element={
                        user.role === 'Admin'
                        ? <Admin count2={count2} count={count} borrow_list={borrowed} request_list={requested} update_count={update_request_count} borrow={true} user={user} />
                        : <Books count2={count2} books={borrowed} user={user} onBookClicked={onBookClicked} isonrequest={false} update_count={update_request_count}/>
                    }/>
                    <Route path='/requested' element={
                        user.role === 'Admin'
                        ? <Admin count={count} count2={count2} request_list={requested} update_count={update_request_count} borrow_list={borrowed} borrow={false} user={user} />
                        : <Books count2={count2} books={requested} user={user} onBookClicked={onBookClicked} isonrequest={true} update_count={update_request_count}/>
                    }/>
                    <Route path='/reviews' element={
                        <ReviewList user={user} should_load={should_load} />
                    }/>
                    <Route path='/user_approve' element={
                        <Approve user={user} should_load={should_load} banMode={banMode}/>
                    }/>
                    <Route path='/user_ban' element={
                        <Approve user={user} should_load={should_load} banMode={banMode}/>
                    }/>
                </Routes>
            </>
    );
}

export default Home;