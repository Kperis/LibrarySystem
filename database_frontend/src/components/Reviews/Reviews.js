import React from "react";
import './Reviews.css'

const Reviews = ({score, submited_by, desc,show_title,title,show_desc,number,showMeanBool}) =>{

    return(
        <div className="review">
            <div>
                <span>{`${submited_by}:`}</span>
                {
                    showMeanBool
                    ? <span>{`${(score/number).toFixed(2)}`}</span>
                    : <span>{`${score}`}</span>
                }   
                {
                    show_title
                    ?   <span>{`${title}`}</span>
                    :   <div></div>
                }
            </div>
            {
                show_desc
                ? <p>{`${desc}`}</p>
                : <div></div>
            }
        </div>
    );

}

export default Reviews;