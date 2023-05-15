import React from "react";
import './Reviews.css'

const Reviews = ({score, submited_by, desc,show_title,title}) =>{

    return(
        <div className="review">
            <div>
                <span>{`${submited_by}:`}</span>
                <span>{`${score}`}</span>
                {
                    show_title
                    ?   <span>{`${title}`}</span>
                    :   <div></div>
                }
            </div>
            <p>{`${desc}`}</p>
        </div>
    );

}

export default Reviews;