import React, { useEffect, useState } from "react";
import './Approve.css';



const Approve = ({user,should_load,banMode}) => {

    const [user_list,setUserList] = useState([]);
    const [count,setCount] = useState(0);

    useEffect(()=>{
        fetch_approve();
    },[should_load,count,banMode])

    const fetch_approve = () =>{
        if(should_load && !banMode){
            fetch('http://localhost:5000/user_approve', {
                method: 'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    role: user.role
                })
            })
            .then(response2 => response2.json())
            .then(data2 => {
                if(data2.new_users === 'none'){
                    alert('no new users');
                    setUserList([]);
                }
                else{
                    setUserList(data2);
                }
                
            })
        }
        else if(should_load && banMode){
            fetch('http://localhost:5000/user_ban', {
                method: 'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                })
            })
            .then(response2 => response2.json())
            .then(data2 => {
                if(data2.users === 'none'){
                    alert('No users found');
                    setUserList([]);
                }
                else{
                    setUserList(data2);
                }
                
            })
        }
    }

    const onApproveUser = (bool,username)=>{
        if(bool){
            fetch('http://localhost:5000/user_approve', {
                method: 'put',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username:username,
                    approve: 1,
                    role:user.role
                })
            })
            .then(response => response.json())
            .then(data => setCount(count+1))
        }
        else{
            fetch('http://localhost:5000/user_approve', {
                method: 'put',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    approve: 0,
                    role:user.role
                })
            })
            .then(response => response.json())
            .then(data => setCount(count+1))
        }
    }

    const onBanUser = (username) =>{
        fetch('http://localhost:5000/user_ban', {
                method: 'put',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            })
            .then(response => response.json())
            .then(data => setCount(count+1))
        }
    


    return(
        <div className="users_container">
            {
                user_list.map((user1,index)=>{
                    return(
                        <div key={user1.username} className="user_container" >
                                {!banMode
                                ?   <div>
                                        <p>{`${user1.first_name}, ${user1.last_name}, ${user1.role}, ${user1.age} Years old`}</p>
                                        <button onClick={()=> onApproveUser(true,user1.username)} >Approve</button>
                                        <button onClick={()=> onApproveUser(false,user1.username) } >Reject</button>
                                    </div>

                                :   <div>
                                        <p>{`${user1.first_name}, ${user1.last_name}, ${user1.role}, ${user1.age} Years old`}</p>
                                        <button onClick={()=> onBanUser(user1.username)}>Ban</button>
                                    </div>
                                }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Approve;