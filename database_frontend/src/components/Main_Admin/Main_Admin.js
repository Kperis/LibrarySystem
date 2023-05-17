import React, { useEffect, useState } from "react";
import Main_Admin_Queries from "../Main_Admin_Queries/Main_Admin_Queries";
import './Main_Admin.css';
import '../Navigation/Navigation.css'
import Approve from "../Approve/Approve";


const Main_Admin = ({user,onSignout,onRouteChange}) =>{

    const [route2,setRoute2] = useState('main');
    const [userList,setUserList] = useState([]);

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = () =>{
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
                setUserList(data2);
                console.log(data2);
            })
    }

    const Query1 = () => {
        fetch('http://localhost:5000/main_admin/all_borrows',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                month:'May'
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    const Query2 = () => {
        setRoute2('query');
    }

    const Query3 = () => {
        setRoute2('query');
    }
    
    const Query4 = () => {
        setRoute2('query');
    }

    const Query5 = () => {
        setRoute2('query');
    }

    const Query6 = () => {
        setRoute2('query');
    }

    const Query7 = () => {
        setRoute2('query');
    }


    const Query8 = () => {
        setRoute2('query');
    }


    return(
        <div>
            <div className="Nav_p">
                <p onClick={()=> setRoute2('main')}>Home</p>
                <p onClick={()=> setRoute2('approve')}>Approve Admins</p>
                <p onClick={() => {window.localStorage.clear(); onSignout(); onRouteChange('signin');}}>Sign Out</p>
            </div>
            {route2 === 'main'
                ?    <div className="Main_admin_container">
                        <h1>{`Welcome ${user.first_name.concat(' ',user.last_name)}`}</h1>
                        <ul className="Main_admin_buttons">
                            <li>
                                <button onClick={() => Query1()} >Borrows from every school</button>
                            </li>
                            <li>
                                <button onClick={()=>Query2()} >Authors by category</button>
                            </li>
                            <li>
                                <button onClick={() => Query3()} >Teachers that borrowed from this category this year</button>
                            </li>
                            <li>
                                <button onClick={()=> Query4()} >Young teachers with most books borrowed</button>
                            </li>
                            <li>
                                <button onClick={()=> Query5()} >Authors whose books have not been borrowed</button>
                            </li>
                            <li>
                                <button onClick={() => Query6()} >Admins with same number of book lendings the last year,with at least 20 of them</button>
                            </li>
                            <li>
                                <button onClick={() => Query7()} >Top 3 category pairs that users borrow</button>
                            </li>
                            <li>
                                <button onClick={()=> Query8()} >Authors with 5,at least,less books than the author with most books</button>
                            </li>
                        </ul>
                    </div>
                    :   (route2==='query'
                        ?   <Main_Admin_Queries />
                        :   <Approve user={user} should_load={true}/>
                        )
            }
           
        </div>
    )
}

export default Main_Admin;