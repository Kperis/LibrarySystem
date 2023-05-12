import React from "react";
import './Reviews.css'

const Reviews = ({score, submited_by, desc}) =>{

    return(
        <div className="review">
            <div>
                <span>{`${submited_by}:`}</span>
                <span>{`${score}`}</span>
            </div>
            <p>{`${desc}`}</p>
        </div>
    );

}

export default Reviews;