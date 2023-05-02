import React,{ useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Book from '../Book/Book';
import { Routes, Route } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';


const Home = (user) => {
    return(
        <div>
            <Navigation />
            <>
                <Routes>
                    <div>
                        <Header first_name={user.first_name} last_name={user.last_name} school={user.school}/>
                        <Books />
                        <Route path="/book" element={
                    <div>
                        <Navigation />
                        <Book />
                    </div>
                    } />
                    <Route path='/myProfile' element={
                    <div>
                        <Navigation />
                        <UserInfo />
                    </div>
                    }/>
                    <Route path='/borrowed' element={
                    <div>
                        <Navigation />
                        <Books />
                    </div>
                    }/>
                    <Route path='/requested' element={
                    <div>
                        <Navigation />
                        <Books />
                    </div>
                    }/>
                    </div>
                </Routes>
            </>
        </div>
    )
}

export default Home;