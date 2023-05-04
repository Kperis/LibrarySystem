import React,{useEffect, useState} from 'react';
import './Book.css';
import Reviews from '../Reviews/Reviews';

const Book = ({user,book}) =>{

    const [hasReviewed, setHasReviewed] = useState(false);
    const [likert, setLikert] = useState();
    const [reviewDescription, setReviewDescription] = useState('');

    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/reviews', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                isbn:book.isbn
            })
        })
        .then(response => response.json())
        .then(data => setReviews(data))

        fetch('http://localhost:3000/user_review', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: user.username, 
                isbn:book.isbn
            })
        })
        .then(response => {
            if(response){
                setHasReviewed(true)
            }
        })

    })


    const onSubmitReview = () =>{
        if(hasReviewed){
            return;
        }
        else{
            fetch('http://localhost:3000/submit_review', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                score: likert,
                description: reviewDescription
            })
        })
    }
    }

    const onReviewChange = (event) => {
        setReviewDescription(event.target.value);
    }

    const onLikertChange = (event) => {
        setLikert(event.target.value)
    }


    return(
        <div>
            <h1 className='book_title'>{`${book.title}`}</h1>
            <div className='book_info'>
                <img src={`${book.cover}`} width='400px' height='700px'/> 
                <ul className='book_details'>
                    <li className='description'>
                        <p>Summary: Lorem ipsum sfhanjafnib  nda osjnjdnj afjn ajn f daudj names
                            ssnfjfdnsjnjvjfjjjnvjadfjuaf uh fua uf vha 
                        </p>
                    </li>
                    <li className='rest'>
                        <p>hot, amogus, sex</p>
                    </li>
                    <li className='rest'>
                        <p>Author(s): Brandon Sanserson</p>
                    </li>
                    <li className='rest'>
                        <p>{`Categories: ${book.category}`}</p>
                    </li>
                    <li>
                        <button className='submit_review'>Request book!</button>
                    </li>
                    <li className='review_container'>
                        <h3 className='review_header'>Reviews</h3>
                        <ul className='review_container'>
                            <span className='review_header'>Strongly Dislike</span>
                            <li><input onLikertChange={onLikertChange} type='radio' name='likert' value='0'/></li>
                            <li><input onLikertChange={onLikertChange} type='radio' name='likert' value='1'/></li>
                            <li><input onLikertChange={onLikertChange} type='radio' name='likert' value='2' checked/></li>
                            <li><input onLikertChange={onLikertChange} type='radio' name='likert' value='3'/></li>
                            <li><input onLikertChange={onLikertChange} type='radio' name='likert' value='4'/></li>
                            <span className='review_header'>Strongly Like</span>
                        </ul>
                        <div>
                            <textarea onChange={onReviewChange} className='review_description' type='text' placeholder='Tell us your thoughts on this book!...'></textarea>
                        </div>
                        <button onClick={onSubmitReview} className='submit_review'>Submit</button>
                    </li>
                    <li className='rest'>
                        <p>Other User Reviews:</p>
                    </li>
                    <li>
                        <div>
                        {
                            reviews.map((review,index) => {
                                return(
                                    <Reviews key={index} submited_by={review.name} score={review.score} desc={review.desc}/>
                                );
                            })
                        }
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default Book;