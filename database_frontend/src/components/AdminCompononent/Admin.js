import React,{ useEffect, useState} from 'react';
import './Admin.css';
import '../Books/Books.css';

const Admin = ({book_list,borrow,user,borrow_list,update_count}) => {
    
    const [username, setUser] = useState('');
    const [title,setTitle] = useState('');
    

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
        fetch('http://localhost:5000/borrow', {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                isbn: array[index].isbn,
                username: array[index].username
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))   

        update_count();
    }

    const onGrantRequest = (index) => {
        if(array[index].copies === 0){
            alert('No copies left');
        }
        else{
            let canBorrow = false;
            const temp = borrow_list.filter(a=>{
                return a.username === array[index].username;
            })
            if(array[index].role.length === 7){
                if(temp.length < 2){
                    canBorrow = true;
                }
            }
            else{
                if(temp.length < 1){
                    canBorrow = true;
                }
            }
            if(canBorrow){
                borrow_list.map((a,i) =>{
                    if(a.username === array[index].username){
                        const date1 = new Date();
                        const date2 = new Date(a.acquire_date);
                        const diffTime = Math.abs(date2-date1);
                        const diffDays = Math.ceil(diffTime / (1000*60*60*24));
                        if(diffDays > 7){
                            alert('User has a book delayed and cannot borrow')
                            canBorrow = false;
                        }
                    }
                })
                if(canBorrow){
                        console.log('ayoo');
                        fetch('http://localhost:5000/request', {
                            method: 'put',
                            headers: {
                                'Content-Type' : 'application/json'
                            },
                            body: JSON.stringify({
                                isbn: array[index].isbn,
                                username: array[index].username
                            })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data))   

                        update_count();
                    
                }
            }
            else{
                alert('User is already on the borrow limit');
            }
               
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