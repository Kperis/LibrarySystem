import React, { useEffect, useState } from "react";
import Main_Admin_Queries from "../Main_Admin_Queries/Main_Admin_Queries";
import './Main_Admin.css';
import '../Navigation/Navigation.css'
import Approve from "../Approve/Approve";
import Add_School from "../Add_School/Add_School";


const Main_Admin = ({user,onSignout,onRouteChange}) =>{

    const [route2,setRoute2] = useState('main');
    const [userList,setUserList] = useState([]);
    const [showMonths,setShowMonths] = useState(false);
    const [showCategories,setShowCategories] = useState(false);
    const [query,setQuery] = useState(0);
    const [showYears, setShowYears] = useState(false);

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
            })
    }

    const Query1 = () => {
        setShowYears(true);
        setShowMonths(true);
        setQuery(1);
        setRoute2('query');
    }

    const Query2 = () => {
        setShowCategories(true);
        setQuery(2);
        setRoute2('query');
    }

    const Query3 = () => {
        setShowCategories(true);
        setQuery(3);
        setRoute2('query');
    }
    
    const Query4 = () => {
        setQuery(4);
        setRoute2('query');
    }

    const Query5 = () => {
        setQuery(5);
        setRoute2('query');
    }

    const Query6 = () => {
        setShowYears(true);
        setQuery(6);
        setRoute2('query');
    }

    const Query7 = () => {
        setQuery(7);
        setRoute2('query');
    }


    const Query8 = () => {
        setQuery(8);
        setRoute2('query');
    }


    const resetQuery = ()=>{
        setQuery(0);
    }

    const onRestoreDatabase = () =>{
        fetch('http://localhost:5000/main_admin/run_backup', {
                method: 'put',
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(response2 => response2.json())
            .then(data2 => {
                alert(data2?.result)
            })
    }

    const onCreateBackup = ()=>{
        fetch('http://localhost:5000/main_admin/create_backup', {
                method: 'put',
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(response2 => response2.json())
            .then(data2 => {
                alert(data2?.result)
            })
    }

    return(
        <div>
            <div className="Nav_p">
                <p onClick={()=> {setRoute2('main'); setShowCategories(false); setShowMonths(false); setShowYears(false); }}>Home</p>
                <p onClick={()=> setRoute2('approve')}>Approve Admins</p>
                <p onClick={()=> setRoute2('add_school')}>Add school</p>
                <p onClick={()=> onCreateBackup()}>Create Backup</p>
                <p onClick={()=> onRestoreDatabase()}>Restore Database from Backup</p>
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
                        ?   <Main_Admin_Queries showMonths={showMonths} showCategories={showCategories} showYears={showYears} query={query} resetQuery={resetQuery}/>
                        :   (route2 === 'approve'
                                ?   <Approve user={user} should_load={true} banMode={false}/>
                                :   <Add_School />    
                           )
                        )
            }
           
        </div>
    )
}

export default Main_Admin;