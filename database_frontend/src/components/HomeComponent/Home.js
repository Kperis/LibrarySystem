import React,{ useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Book from '../Book/Book';
import { Routes, Route } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import Admin from '../AdminCompononent/Admin';



const Home = ({user, onRouteChange,onSignout}) => {

    const [books,setBooks] = useState([]);
    const [borrowed,setBorrowed] = useState([]);
    const [requested,setRequested] = useState([]);
    const [activeBook, setActiveBook] = useState({});
    const [delayed_return, setDelayedReturn] = useState(false);
    const [count,setCount] = useState(0);
    const [rev_count,setRevCount] = useState(0);


    useEffect(() => {
        fetch('http://localhost:5000/books',{
            method: 'post',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                school_name: user.school_name
            })
        })
        .then(response => response.json())
        .then(data => setBooks(data))

        fetchOther();   


    }, [count])
    
    const fetchOther = async () => {
        await fetch('http://localhost:5000/borrow', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                role: user.role,
                username: user.username
            })
        })
        .then(response => response.json())
        .then(data => setBorrowed(data))

        await fetch('http://localhost:5000/request', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                role: user.role,
                username: user.username
            })
        })
        .then(response => response.json())
        .then(data => setRequested(data))
        
        borrowed.forEach(element => {
            const date1 = new Date(element.acquire_date);
            const date2 = new Date(element.return_date);

            const diffTime = Math.abs(date2-date1);
            const diffDays = Math.ceil(diffTime / (1000*60*60*24));
            if(diffDays > 7){
                setDelayedReturn(true);
            }
            
        });

        
    }

    const update_request_count = () =>{
        setCount(count+1);
    }

    const onBookClicked = (isbn) => {
        let temp = books.filter(a =>{
            return a.isbn === isbn
        });
        setActiveBook(temp[0]);
        window.localStorage.setItem('book',JSON.stringify(temp[0]));
    }

    const update_reviews = () =>{
        setRevCount(rev_count + 1);
    }

    return(
            <>
                <Navigation onRouteChange={onRouteChange} onSignout={onSignout}/>
                <Routes>
                    <Route path='/' element={
                        <div>
                            <Header first_name={user.first_name} last_name={user.last_name} school={user.school_name}/>
                            <Books books={books} user={user} onBookClicked={onBookClicked} isonrequest={false} update_count={update_request_count}/>
                        </div>
                    } />
                    <Route path="/book" element={
                        <Book user={user} book={activeBook} rev_count={rev_count} update_reviews={update_reviews} hasDelayed={delayed_return} requested={requested} update_count={update_request_count} borrowed={borrowed} />
                    } />
                    <Route path='/myProfile' element={
                        <UserInfo user={user}/>
                    }/>
                    <Route path='/borrowed' element={
                        user.role === 'Admin'
                        ? <Admin book_list={borrowed} borrow={true} />
                        : <Books books={borrowed} user={user} onBookClicked={onBookClicked} isonrequest={false} update_count={update_request_count}/>
                    }/>
                    <Route path='/requested' element={
                        user.role === 'Admin'
                        ? <Admin book_list={requested} borrow={false} />
                        : <Books books={requested} user={user} onBookClicked={onBookClicked} isonrequest={true} update_count={update_request_count}/>
                    }/>

                </Routes>
            </>
    );
}

export default Home;