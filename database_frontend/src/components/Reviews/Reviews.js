import React from "react";

const Reviews = ({score, submited_by, desc}) =>{

    return(
        <div className="review">
            <span>{`${submited_by}`}</span>
            <span>{`${score}`}</span>
            <p>{`${desc}`}</p>
        </div>
    );

}

export default Reviews;