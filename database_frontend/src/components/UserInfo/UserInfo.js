import React, { useEffect, useState } from "react";
import './UserInfo.css';

const UserInfo = ({user}) => {

    const [changePass,setPass] = useState(false);
    const [newPass,setNewPass] = useState('');


    const onPasswordChange = () =>{
        setPass(true);
    }


    const onNewPassChange = (event) => {
        setNewPass(event.target.value);
    }

    const onSubmitPass = async () => {
        if(newPass === ''){
            alert('Please insert something')
            return;
        }
        else{
            fetch('http://localhost:5000/change_password', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'},
                body: JSON.stringify({
                    username: user.username,
                    new_password: newPass
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))

            setPass(false);
        }
    }

    return(
        <div className="userinfo_container">
            <ul className="userinfo">
                <li >
                    <p>{`First Name: ${user.first_name}`}</p>
                </li>
                <li>
                    <p>{`Last Name: ${user.last_name}`}</p>
                </li>
                <li>
                    <p>{`Age: ${user.age} years old`}</p>
                </li>
                <li>
                    <p>{`School: ${user.school_name}`}</p>
                </li>
                <button onClick={onPasswordChange}>Change Password</button>
                {
                    changePass
                    ? <div>
                        <input onChange={onNewPassChange} type='text' placeholder='Enter new password' />
                        <input type='submit' onClick={onSubmitPass}/>
                    </div>
                    : <div></div>
                }
            </ul>
        </div>
    )
}

export default UserInfo;