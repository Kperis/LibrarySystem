import React, { useEffect, useState } from "react";

const Main_Admin_Queries = ({showSelect,query,resetQuery}) => {

    const [month,setMonth] = useState('all');

    useEffect(() =>{
        
        selectFetch(query,'all');

        return () =>{
            resetQuery();
        }
    },[])
    
    
    const Months = ['all','January','February','March','April','May','June','July','August','September','October','November','December'];

    const onMonthChange = (event) =>{
        selectFetch(query,event.target.value);
    }

    const selectFetch = (query,month)=>{
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
                .then(data => console.log(data))
                break;
            case 2:

        }
    }


    return(
        <div>
            {showSelect
            ?   <select onChange={onMonthChange}>
                    {
                        Months.map((month,index)=>{
                            return <option key={index} value={month} >{month}</option>
                        })
                    }
                </select>
            :   <div></div>
            }

        </div>
    )
}

export default Main_Admin_Queries;