import React,{useState,useEffect} from "react";

const Reviews = ({score, submited_by, desc}) =>{
    
    const score_text = '';

    useEffect(() => {
        switch (score){
            case 0:
                score_text = 'Strongly Disliked'
                break;
            case 1:
                score_text = 'Mildly Disliked'
                break;
            case 2:
                score_text = 'Neutral'
                break;
            case 3:
            score_text = 'Mildly Liked'
            break;
            case 4:
            score_text = 'Strongly Liked'
            break;
        }
    },[])


    return(
        <div className="review">
             <span>{`${submited_by}`}</span>
            <span>{`${score_text}`}</span>
            <p>{`${desc}`}</p>
        </div>
    );

}

export default Reviews;