import React,{useEffect, useState} from 'react';
import './Book.css';
import Reviews from '../Reviews/Reviews';

const Book = ({user,book,hasDelayed,rev_count,update_reviews,requested,borrowed,update_count}) =>{

    const [hasReviewed, setHasReviewed] = useState(false);
    const [likert, setLikert] = useState('3');
    const [reviewDescription, setReviewDescription] = useState('');

    const [reviews, setReviews] = useState([]);
    const [clicked,setClicked] = useState(false);
    
    useEffect(() => {
        setHasReviewed(false);
        fetchreviews();
        
    },[rev_count])

    const fetchreviews = async () =>{
        await fetch('http://localhost:5000/reviews', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                isbn:book.isbn
            })
        })
        .then(response => response.json())
        .then(data => setReviews(data))

        await fetch('http://localhost:5000/user_review', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: user.username, 
                isbn:book.isbn
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.reviewed === 'yes'){
                setHasReviewed(true);
            }
            else{

            }
        })
    }


    const onSubmitReview = async () =>{
        
        await fetch('http://localhost:5000/submit_review', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            username: user.username,
            isbn: book.isbn,
            score: likert,
            description: reviewDescription
        })
        })
        .then(response => response.json())
        .then(data => console.log(data))

        update_reviews();

    }

    const onReviewChange = (event) => {
        setReviewDescription(event.target.value);
    }

    const onLikertChange = (event) => {
        setLikert(event.target.value);
        console.log(likert)
    }


    const onRequestBook = async () =>{
        if(!clicked){
            let hasRequested = false;
            let hasBorrowed = false;
            if(requested.length !== 0){
                requested.forEach(element => {
                    if(element.isbn === book.isbn){
                        hasRequested = true;
                    }
                    return;
                });
            }
            
            if(borrowed.length !== 0){
                borrowed.forEach(element => {
                    if(element.isbn === book.isbn){
                        hasBorrowed = true;
                    }
                    return;
                });
            }
            
            if(user.role === 'student'){
                if(requested.length < 2 && !hasDelayed && !hasRequested && !hasBorrowed){
                    await fetch('http://localhost:5000/book_request', {
                        method: 'post',
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            username: user.username,
                            isbn: book.isbn
                        })
                        })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    
                    update_count();
                }
                else{
                    alert('Cannot request book');
                }
            }
            else{
                if(requested.length < 1 && !hasDelayed && !hasRequested && !hasBorrowed){
                    fetch('http://localhost:5000/book_request', {
                        method: 'post',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({
                            username: user.username,
                            isbn: book.isbn
                        })
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                }
                else{
                    alert('Cannot request book');
                }
            }
        }
        else{
            alert('Cannot request book');;
        }
        return;
    }

    return(
        <div>
            <h1 className='book_title'>{`${book.title.toUpperCase()}`}</h1>
            <div className='book_info'>
                <img alt='' src={`${book.cover_m}`} width='400px' height='700px'/> 
                <ul className='book_details'>
                    <li className='description'>
                        <p>{`${book.summary}`}</p>
                    </li>
                    <li className='rest'>
                        <p>{`${book.keywords}`}</p>
                    </li>
                    <li className='rest'>
                        <p>Author(s): {`${book.author}`}</p>
                    </li>
                    <li className='rest'>
                        <p>{`Categories: ${book.category}`}</p>
                    </li>
                    <li className='rest'>
                        <span>{`Published by: ${book.publisher}`}</span>
                    </li>
                    <li>
                        <button className='submit_review' onClick={() => {onRequestBook(); setClicked(true);}} >Request book!</button>
                    </li>
                    {hasReviewed === false
                    ? (
                    <li className='review_container'>
                        <h3 className='review_header'>Review</h3>
                        <ul className='review_container'>
                            <span className='review_header'>0(Terrible!)</span>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='0' /></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='1'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='2'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='3'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='4'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='5'/></li>
                            <span className='review_header'>5(Fantastic!)</span>
                        </ul>
                        <div>
                            <textarea onChange={onReviewChange} className='review_description' type='text' placeholder='Tell us your thoughts on this book!...'></textarea>
                        </div>
                        <button onClick={onSubmitReview} className='submit_review'>Submit</button>
                    </li>)
                    : <p className='rest'>Already Reviewed!</p>
                    }   
                </ul>
                <div>
                    <p className='review_header2'>Other User Reviews:</p>
                    <div className='review_box'> 
                    {
                        reviews.map((review,index) => {
                            return(
                                <Reviews key={index} date={review.review_date} submited_by={review.first_name.concat(' ',review.last_name)} score={review.score} desc={review.description}/>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Book;