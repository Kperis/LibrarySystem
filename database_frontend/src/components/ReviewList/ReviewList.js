import React,{useState,useEffect} from "react";
import Reviews from "../Reviews/Reviews";
import './ReviewList.css';

const ReviewList = ({user,should_load}) =>{

    const [reviews,setReviews] = useState([]);
    const [count2,setCount2] = useState(0);
    const [mean_score,setMeanScore] = useState([]);
    const [showMean,setShowMean] = useState(false);
    const [showCat, setShowCat] = useState(false);

    useEffect(()=>{
        fetchRevs();
    },[count2,should_load])

    useEffect(()=>{

    },[showMean,showCat])

    const fetchRevs = () =>{
        if(should_load){
            fetch('http://localhost:5000/reviews', {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    role: 'Admin',
                    username: user.username
                })
            })
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
    }
    }

    const update_count = () =>{{
        setCount2(count2+1);
    }}

    const onApproveReview = (approve,isbn,username) => {
        fetch('http://localhost:5000/accept_review', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                isbn: isbn,
                username: username,
                approved: approve
            })
        })
        .then(response => response.json())
        .then(data => update_count())

        
    }


    const onMeanScore = () =>{
        fetch('http://localhost:5000/mean_score', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: user.username
            })
        })
        .then(response => response.json())
        .then(data => {
            setMeanScore(data);
        })

        if(showCat){
            setShowCat(false);
            setShowMean(true);
        }
        else if(showMean){
            setShowMean(false);
        }
        else{
            setShowMean(true);
        }
    
    }

    const onMeanScoreCategory = () =>{
        fetch('http://localhost:5000/mean_score_category', {
            method: 'get'
        })
        .then(response => response.json())
        .then(data => {
            setMeanScore(data);
            if(showMean){
                setShowMean(false);
                setShowCat(true);
            }
            else if(showCat) {
                setShowCat(false);
            }
            else{
                setShowCat(true);
            }
        })

    }


    return(
        <div>
            <div className='review_box2'> 
                <div className="average_score">
                    <button onClick={() => onMeanScore()}>Show Average Review score per user</button>
                    <button onClick={() => onMeanScoreCategory()} >Show Average Review score per category</button>
                </div>
                    {
                        !showMean && !showCat
                        ? reviews.map((review,index) => {
                            return(
                                <div key={index}>
                                    <div className="review_container2">
                                        <div>
                                            <Reviews className='review_to_approve' show_desc={true} title={review.title} date={review.review_date} submited_by={review.first_name.concat(' ',review.last_name)} show_title={true} score={review.score} desc={review.description}/>
                                        </div>
                                        <button onClick={() => onApproveReview(1,review.isbn,review.username)}>Approve</button>
                                        <button onClick={() => onApproveReview(0,review.isbn,review.username)}>Reject</button>
                                    </div>
                                </div>
                            );
                        })

                        : mean_score.map((review,index) => {
                            return(
                                <div key={index}>
                                    <div  className="review_container2">
                                        <div>
                                            <Reviews className='review_to_approve' showCat={showCat} category={review.first_name} submited_by={review?.first_name.concat(' ',review?.last_name)} show_desc={false} show_title={false} score={review?.mean}/>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
            </div>
        </div>
    )
}

export default ReviewList;