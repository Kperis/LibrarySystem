import React,{ useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Book from '../Book/Book';
import { Routes, Route } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';



const Home = ({user, onRouteChange}) => {



    const [books,setBooks] = useState([]);
    const [borrowed,setBorrowed] = useState([]);
    const [requested,setRequested] = useState([]);
    const [activeBook, setActiveBook] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/books',{
            method: 'get',
            headers: {'Content-Type':'application/json'}
        })
        .then(response => response.json())
        .then(data => setBooks(data))

    }, [])

    //     fetch('http://localhost:3000/borrowed',{
    //         method: 'get',
    //         headers: {'Content-Type' : 'application/json'}
    //     })
    //     .then(response => response.json())
    //     .then(borrowed => setBorrowed(borrowed))

    //     fetch('http://localhost:3000/requested',{
    //         method: 'get',
    //         headers: {'Content-Type' : 'application/json'}
    //     })
    //     .then(response => response.json())
    //     .then(requested => setRequested(requested))
    

    const onBookClicked = (index) => {
        setActiveBook(books[index]);
    }


    return(
            <>
                <Navigation onRouteChange={onRouteChange}/>
                <Routes>
                    <Route path='/' element={
                        <div>
                            <Header first_name={user.first_name} last_name={user.last_name} school={user.school}/>
                            <Books books={books} onBookClicked={onBookClicked}/>
                        </div>
                    } />
                    <Route path="/book" element={
                        <Book user={user} book={activeBook}/>
                    } />
                    <Route path='/myProfile' element={
                        <UserInfo user={user}/>
                    }/>
                    <Route path='/borrowed' element={
                        <Books books_view={borrowed}/>
                    }/>
                    <Route path='/requested' element={
                        <Books books_view={requested}/>
                    }/>

                </Routes>
            </>
    );
}

export default Home;