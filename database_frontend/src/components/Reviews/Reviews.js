import React,{useEffect} from "react";

const Reviews = ({score, submited_by, desc}) =>{
    
    let score_text = '';

    useEffect(() => {
        switch (score){
            case 0:
                score_text = 'Strongly Disliked';
                break;
            case 1:
                score_text = 'Mildly Disliked';
                break;
            case 2:
                score_text = 'Neutral';
                break;
            case 3:
            score_text = 'Mildly Liked';
            break;
            case 4:
            score_text = 'Strongly Liked';
            break;
            default: score_text = 'Neutral';
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