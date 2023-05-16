import React, { useEffect, useState } from "react";
import Main_Admin_Queries from "../Main_Admin_Queries/Main_Admin_Queries";
import './Main_Admin.css';
import '../Navigation/Navigation.css'


const Main_Admin = ({user,onSignout,onRouteChange}) =>{

    const [route2,setRoute2] = useState('main');

    useEffect(()=>{
        console.log(user);
    },[])

    const Query1 = () => {
        setRoute2('query');
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
                <p onClick={()=> Query1()}>Approve Admins</p>
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
                    :   <Main_Admin_Queries />
            }
           
        </div>
    )
}

export default Main_Admin;