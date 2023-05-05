import React,{ useState} from 'react';

const Admin = ({book_list,borrow}) => {
    
    const [username, setUser] = useState('');
    const [title,setTitle] = useState('');

    

    const onFilterUser = (event) =>{
        setUser(event.target.value);
    }

    const onFilterTitle = (event) =>{
        setTitle(event.target.value);
    }

    const array = book_list.filter(()=>{
        return(book_list.full_name.toLowerCase().includes(username.toLowerCase()) && book_list.title.toLowerCase().includes(title.toLowerCase()))
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
        const x = book_list.splice(index,index);
        const y = x[0];
        fetch('http://localhost:5000/request', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user_id: y.user_id,
                isbn: y.isbn
            })
        })
    }

    return(
        <div>
            <div>
                <input type='text' onChange={onFilterTitle}/>
                <input type='text' onChange={onFilterUser}/>
            </div>
            <div className='borrow_container'>
                {borrow === true
                ? (array.map((element,index) => {
                    return(
                        <div className='borrow_box'>
                            <p className='borrow_text'>{`${element.first_name} ${element.last_name} (${element.role}): ${element.title} due return-> ${element.return_date}`}</p>
                            <button className='Grant' onClick={() => onGrantReturn(index)} >Grant</button>
                        </div>
                    )
                }))
                :(array.map((element,index) => {
                    return(
                        <div>
                            <p className='borrow_text'>{`${element.first_name} ${element.last_name} (${element.role}): ${element.title} request date-> ${element.request_date}`}</p>
                            <button className='Grant' onChange={()=> onGrantRequest(index)}>Grant</button>
                        </div>
                    )
                }))
                }  
            </div>
        </div>
    );
}


export default Admin;