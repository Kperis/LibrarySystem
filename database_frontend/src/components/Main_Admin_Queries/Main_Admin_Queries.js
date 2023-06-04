import React, { useEffect, useState } from "react";
import './Main_Admin_Queries.css'


const Main_Admin_Queries = ({showCategories,showMonths,query,resetQuery,showYears}) => {

    const [data,setData] = useState([]);

    useEffect(() =>{
        
        selectFetch(query,'all','fantasy',2023);

        return () =>{
            resetQuery();
        }
    },[])
    
    const [monthStore, setMonthStore] = useState('all');
    const [yearStore,setYearStore] = useState(2023);

    const Months = ['all','January','February','March','April','May','June','July','August','September','October','November','December'];
    const categories = ['fantasy','action & adventure','history','drama','science fiction','romance','mystery'];
    const Years = [2023,2022,2021,2020];


    const onMonthChange = (event) =>{
        setMonthStore(event.target.value);
        selectFetch(query,event.target.value,'',yearStore);
    }

    const onCategoryChange = (event) =>{
        selectFetch(query,'',event.target.value,0)
    }

    const selectFetch = (query,month,category,year)=>{
        switch (query){
            case 1:
                fetch('http://localhost:5000/main_admin/all_borrows',{
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        month: month,
                        year: year
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data?.borrows === 'none'){
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
                    method: 'get'
                })
                .then(response => response.json())
                .then(data => {
                    setData(data.result);
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
            fetch('http://localhost:5000/main_admin/same_borrows_admin',{
                method: 'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    year: year
                }) 
            })

            .then(response => response.json())
            .then(data => {
                let result = []
                for(let i = 0; i<data.length ; i++){
                    let temp = data[i].join('       ');
                    result.push(temp);
                }
                
                setData(result);
            })
            break;
            case 7:
                fetch('http://localhost:5000/main_admin/top_3_category_combinations',{
                    method: 'get'
                })
                .then(response => response.json())
                .then(data => {
                    setData(data.result);
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

    const onYearChange = (event) =>{
        setYearStore(event.target.value);
        selectFetch(query,monthStore,'',event.target.value);
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
            {showYears
            ?   <select onChange={onYearChange}>
                    {
                        Years.map((year,index)=>{
                            return <option key={index} value={year} >{year}</option>
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