import React, { useEffect, useState } from "react";
import './Main_Admin_Queries.css'


const Main_Admin_Queries = ({showCategories,showMonths,query,resetQuery}) => {

    const [month,setMonth] = useState('all');
    const [data,setData] = useState([]);
    const [info1,setInfo1] = useState('');
    const [info2,setInfo2] = useState('');
    const [info3,setInfo3] = useState('');


    useEffect(() =>{
        
        selectFetch(query,'all','fantasy');

        return () =>{
            resetQuery();
        }
    },[])
    
    
    const Months = ['all','January','February','March','April','May','June','July','August','September','October','November','December'];
    const categories = ['fantasy','action & adventure','history','drama','science fiction','romance','mystery'];


    const onMonthChange = (event) =>{
        selectFetch(query,event.target.value,'');
    }

    const onCategoryChange = (event) =>{
        selectFetch(query,'',event.target.value)
    }

    const selectFetch = (query,month,category)=>{
        switch (query){
            case 1:
                fetch('http://localhost:5000/main_admin/all_borrows',{
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        month: month
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data?.borrow === 'none'){
                        setData([]);
                    }
                    else{
                        setData(data);
                    }
                    
                })
                break;
            case 2:
                fetch('http://localhost:5000/main_admin/category_search',{
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        category: category
                    })
                })
                .then(response => response.json())
                .then(data => {
                    setData(data.authors);
                })
                break;

            case 3:
                fetch('http://localhost:5000/main_admin/category_search',{
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        category: category
                    })
                })
                .then(response => response.json())
                .then(data => {
                    setData(data.teachers);
                })
                break;
            case 4:
                fetch('http://localhost:5000/main_admin/top_teachers',{
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        month: month
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data?.borrow === 'none'){
                        setData([]);
                    }
                    else{
                        setData(data);
                    }
                    
                })
                break;
            case 5:
                fetch('http://localhost:5000/main_admin/no_borrow_author',{
                    method: 'get',
                })
                .then(response => response.json())
                .then(data => {
                    setData(data.result);
                    // console.log(data);
                    
                })
                break;
            case 6:
            fetch('http://localhost:5000/main_admin/all_borrows',{
                method: 'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    month: month
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data?.borrow === 'none'){
                    setData([]);
                }
                else{
                    setData(data);
                }
                
            })
            break;
            case 7:
                fetch('http://localhost:5000/main_admin/all_borrows',{
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        month: month
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data?.borrow === 'none'){
                        setData([]);
                    }
                    else{
                        setData(data);
                    }
                    
                })
                break;
            case 8:
            fetch('http://localhost:5000/main_admin/5_less_top',{
                method: 'get'
            })
            .then(response => response.json())
            .then(data => {
                setData(data.result);
            })
            break;
            default:
                setData([]);
                break;
        }
    }


    return(
        <div>
            {showMonths
            ?   <select onChange={onMonthChange}>
                    {
                        Months.map((month,index)=>{
                            return <option key={index} value={month} >{month}</option>
                        })
                    }
                </select>
            :   <div></div>
            }
            {showCategories
            ?   <select onChange={onCategoryChange}>
                    {
                        categories.map((category,index)=>{
                            return <option key={index} value={category} >{category}</option>
                        })
                    }
                </select>
            :   <div></div>
            }
            <div>
                {
                    data.map((info,index) =>{
                        // <Info_Box key={index} sch_name={info?.name} sch_city={info?.city} count={info?.count} />
                        return(
                            <div key={index} className="queries_container">
                                <span>{info?.info1 || info}</span>
                                <span>{info?.info2}</span>
                                <span>{info?.info3}</span>
                            </div>
                            )
                    })
                }
            </div>

        </div>
    )
}

export default Main_Admin_Queries;