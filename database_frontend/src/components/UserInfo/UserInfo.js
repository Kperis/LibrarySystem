import React from "react";
import './UserInfo.css';

const UserInfo = () => {
    return(
        <div className="userinfo_container">
            <ul>
                <li className="userinfo">
                    <p>First Name: Kostas</p>
                </li>
                <li className="userinfo">
                    <p>Last Name: Peris</p>
                </li>
                <li className="userinfo">
                    <p>Age: 21</p>
                </li>
                <li className="userinfo">
                    <p>School: 3o</p>
                </li>
            </ul>
        </div>
    )
}

export default UserInfo;