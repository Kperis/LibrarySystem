import React,{ useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Book from '../Book/Book';
import { Routes, Route } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import Admin from '../AdminCompononent/Admin';
import Review_list from '../ReviewList/Review_list';



const Home = ({user, onRouteChange,onSignout}) => {

    const [books,setBooks] = useState([]);
    const [borrowed,setBorrowed] = useState([]);
    const [requested,setRequested] = useState([]);
    const [delayed_return, setDelayedReturn] = useState(false);
    const [count,setCount] = useState(0);
    const [count2,setCount2] = useState(0);
    


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
                school_name: user.school_name,
                city: user.city 
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

    const tab_change = () =>{
        setCount2(count2+1);
    }


    return(
            <>
                <Navigation onRouteChange={onRouteChange} onSignout={onSignout} user={user} tab_change={tab_change} />
                <Routes>
                    <Route path='/' element={
                        <div>
                            <Header first_name={user.first_name} last_name={user.last_name} school={user.school_name}/>
                            <Books count2={count2} books={books} user={user} onBookClicked={onBookClicked} isonrequest={false} update_count={update_request_count}/>
                        </div>
                    } />
                    <Route path="/book" element={
                        <Book hasDelayed={delayed_return} requested={requested} update_count={update_request_count} borrowed={borrowed} />
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
                        <Review_list user={user}/>
                    }/>

                </Routes>
            </>
    );
}

export default Home;