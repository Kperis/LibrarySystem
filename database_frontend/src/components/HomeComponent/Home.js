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
    const [delayed_return, setDelayedReturn] = useState(false);
    const [count,setCount] = useState(0);
    const [rev_count,setRevCount] = useState(0);
    const [active_book,setActiveBook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [hasReviewed, setHasReviewed] = useState(false);


    useEffect(() => {
        fetchOther();   
    }, [count])

   
    const fetchOther = async () => {
        // console.log(user.role)
        let role = 'ho'
        if(user?.role === 'Admin'){
            role = 'Admin';
        }
        else{
            role = 'student';
        } 

        await fetch('http://localhost:5000/books',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                school_name: user.school_name 
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data?.books === 'none'){
                setBooks([]);
            }
            else{
                setBooks(data);
            }
            
        })
        .catch(err => console.log(err));

        await fetch('http://localhost:5000/borrow', {
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
            }
            
        })

        await fetch('http://localhost:5000/request', {
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
            
        })
        
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
        window.localStorage.setItem("book",JSON.stringify(temp[0]));
        console.log(requested);
        console.log(borrowed);
    }

    const update_reviews = () =>{
        setRevCount(rev_count + 1);
        // fetch_rev(isbn);

    }

    // const fetch_rev = async (isbn) =>{
    //     await fetch('http://localhost:5000/reviews', {
    //         method: 'post',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             isbn:isbn
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if(data?.reviews === 'none'){
    //             setReviews([])
    //         }
    //         else{
    //             setReviews(data);
    //         }
    //     })
    //     .catch(err => console.log(err))

    //     await fetch('http://localhost:5000/user_review', {
    //         method: 'post',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             username: user?.username, 
    //             isbn:isbn
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if(data.reviewed === 'yes'){
    //             setHasReviewed(true);
    //         }
    //         else{
    //             setHasReviewed(false);
    //         }
    //     })
    // }

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
                        <Book  reviews={reviews} hasReviewed={hasReviewed} rev_count={rev_count} hasDelayed={delayed_return} requested={requested} update_count={update_request_count} borrowed={borrowed} />
                    } />
                    <Route path='/myProfile' element={
                        <UserInfo user={user}/>
                    }/>
                    <Route path='/borrowed' element={
                        user.role === 'Admin'
                        ? <Admin book_list={borrowed} borrow={true} user={user} />
                        : <Books books={borrowed} user={user} onBookClicked={onBookClicked} isonrequest={false} update_count={update_request_count}/>
                    }/>
                    <Route path='/requested' element={
                        user.role === 'Admin'
                        ? <Admin book_list={requested} borrow_list={borrowed} borrow={false} user={user} />
                        : <Books books={requested} user={user} onBookClicked={onBookClicked} isonrequest={true} update_count={update_request_count}/>
                    }/>

                </Routes>
            </>
    );
}

export default Home;