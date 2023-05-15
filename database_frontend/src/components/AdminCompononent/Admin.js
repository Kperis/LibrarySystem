import React,{ useEffect, useState} from 'react';
import './Admin.css';
import '../Books/Books.css';

const Admin = ({book_list,borrow,user,borrow_list}) => {
    
    const [username, setUser] = useState('');
    const [title,setTitle] = useState('');

    // useEffect(()=>{
    //     console.log(book_list)
    // },[])

    const onFilterUser = (event) =>{
        setUser(event.target.value);
    }

    const onFilterTitle = (event) =>{
        setTitle(event.target.value);
    }

    const array = book_list.filter(book=>{
        return(book.first_name.concat(' ',book.last_name).toLowerCase().includes(username.toLowerCase()) && book.title.toLowerCase().includes(title.toLowerCase()))
    })

    const onGrantReturn = (index) => {
        const x = book_list.splice(index,index);
        const y = x[0];
        fetch('http://localhost:5000/return', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user_id: y.user_id,
                isbn: y.isbn
            })
        })
    }

    const onGrantRequest = (index) => {
        if(array[index].copies === 0){
            alert('No copies left');
        }
        else{
            borrow_list.map((a,i) =>{
                if(a.username === array[index].username){
                    const date1 = new Date();
                    const date2 = new Date(a.acquire_date);
                    const diffTime = Math.abs(date2-date1);
                    const diffDays = Math.ceil(diffTime / (1000*60*60*24));
                    if(diffDays > 7){
                        alert('User has a book delayed and cannot borrow')
                    }
                    else{
                        fetch('http://localhost:5000/request', {
                            method: 'put',
                            headers: {
                                'Content-Type' : 'application/json'
                            },
                            body: JSON.stringify({
                                isbn: a.username,
                                username: user?.username
                            })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data))   
                    }
                }
            })
               
        }
    }

    return(
        <div>
            <div className='searchspace'>
                <input className='searchbox' type='text' onChange={onFilterTitle} placeholder='Search by title...'/>
                <input className='searchbox' type='text' onChange={onFilterUser} placeholder='Search by User...'/>
            </div>
            <div className='borrow_container'>
                {borrow === true
                ? (array.map((element,index) => {
                    return(
                        <div key={element.title} className='borrow_box'>
                            <p className='borrow_text'>{`${element.first_name} ${element.last_name} (${element.role}): ${element.title} due return-> ${element.return_date}`}</p>
                            <button className='Grant' onClick={() => onGrantReturn(index)} >Returned</button>
                        </div>
                    )
                }))
                :(array.map((element,index) => {
                    return(
                        <div key={element.title} className='borrow_box'>
                            <p>{`${element.first_name} ${element.last_name} (${element?.role}): ${element.title} request date-> ${element.date_of_request}`}</p>
                            <button onClick={()=> onGrantRequest(index)}>Grant</button>
                        </div>
                    )
                }))
                }  
            </div>
        </div>
    );
}


export default Admin;