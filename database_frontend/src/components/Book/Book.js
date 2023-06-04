import React,{useEffect, useState} from 'react';
import './Book.css';
import Reviews from '../Reviews/Reviews';

const Book = ({hasDelayed,requested,borrowed,update_count,editBook,should_load}) =>{
    
    
    let temp1 = JSON.parse(window.localStorage.getItem('user'));
    let temp2 = JSON.parse(window.localStorage.getItem('book'));
    const [user,setUser] = useState(temp1);
    const [book,setBook] = useState(temp2);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [likert, setLikert] = useState('3');
    const [reviewDescription, setReviewDescription] = useState('');
    const [reviews, setReviews] = useState([]);
    const [clicked,setClicked] = useState(false);
    const [refetch,setRefetch] = useState(0);
    const [editMode,setEditMode] = useState(false);
    const [editTitle,setEditTitle] = useState('');
    const [editSummary,setEditSummary] = useState('');
    const [editAuthors,setEditAuthors] = useState([]);
    const [editKeywords,setEditKeywords] = useState([]);
    const [editCover,setEditCover] = useState('');
    const [editCategories,setEditCategories] = useState([]);
    const [editPublisher,setEditPublisher] = useState('');
    const [editCopies,setEditCopies] = useState(0);
    const [editPageCount,setEditPageCount] = useState(0);
    const [delayed_return, setDelayedReturn] = useState(false);
    // const [editCategories,setEditCategories] = useState([{name:'Fantasy',checked:false},
    //                                                     {name:'Sci-fi',checked:false},
    //                                                     {name:'Romance',checked:false},
    //                                                     {name:'Mystery',checked:false},
    //                                                     {name:'Drama',checked:false},
    //                                                     {name:'Action',checked:false},
    //                                                     {name:'Historical',checked:false}])
   const checkList = ['Fantasy','Sci-fi','Romance','Mystery','Drama','Action','Historical'];
    
    useEffect(() => {
        // window.localStorage.removeItem("reviews");
        // if(refetch===1){
        //     fetchreviews();
        // }
        // else{
        //     setReviews(JSON.parse(window.localStorage.getItem("reviews")));
        //     setHasReviewed(JSON.parse(window.localStorage.getItem("hasReviewed")));
        // }
        // console.log(book);

        // return () =>{
        //     window.localStorage.removeItem("reviews");
        //     window.localStorage.removeItem("hasReviewed");
        // }
        fetchreviews();
        borrowed.forEach(element => {
            const date1 = new Date(element.acquire_date);
            const date2 = new Date();

            const diffTime = Math.abs(date2-date1);
            const diffDays = Math.ceil(diffTime / (1000*60*60*24));
            if(diffDays > 7){
                setDelayedReturn(true);
            }
            
        });
    },[refetch,should_load])

    const fetchreviews = () =>{
        if(should_load){
            fetch('http://localhost:5000/reviews', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    isbn:book?.isbn,
                    role: 'student',
                    username: user?.username
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data?.reviews === 'none'){
                    setReviews([]);
                    window.localStorage.setItem("reviews",[]);
                }
                else{
                    setReviews(data);
                    window.localStorage.setItem("reviews",JSON.stringify(data));
                }

                fetch('http://localhost:5000/user_review', {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        username: user?.username, 
                        isbn:book?.isbn
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data.reviewed === 'yes'){
                        setHasReviewed(true);
                        window.localStorage.setItem("hasReviewed",true);
                    }
                })
            })
            .catch(err => console.log(err))
        }

    }


    const onSubmitReview = () =>{
        
        fetch('http://localhost:5000/submit_review', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: user.username,
                isbn: book.isbn,
                score: likert,
                description: reviewDescription
            })
        })
        .then(response => response.json())
        .then(data => {
            setHasReviewed(true);
            window.localStorage.setItem("hasReviewed",true);
            setRefetch(1);
        })

        
    }

    const onReviewChange = (event) => {
        setReviewDescription(event.target.value);
    }

    const onLikertChange = (event) => {
        setLikert(event.target.value);
    }


    const onRequestBook = () =>{
        if(!clicked){
            let hasRequested = false;
            let hasBorrowed = false;
            if(requested.length !== 0){
                requested.forEach(element => {
                    if(element.isbn === book.isbn){
                        hasRequested = true;
                    }
                });
            }
            
            if(borrowed.length !== 0){
                borrowed.forEach(element => {
                    if(element.isbn === book.isbn){
                        hasBorrowed = true;
                    }
                });
            }
            
            if(user.role.length === 7){
                if(requested.length < 2 && !delayed_return && !hasRequested && !hasBorrowed){
                    fetch('http://localhost:5000/book_request', {
                        method: 'post',
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            username: user.username,
                            isbn: book.isbn
                        })
                        })
                    .then(response => response.json())
                    .then(data => update_count())
                    
                    alert('Book requested');
                }
                else{
                    alert('Cannot request book');
                }
            }
            else{
                if(requested.length < 1 && !hasDelayed && !hasRequested && !hasBorrowed){
                    fetch('http://localhost:5000/book_request', {
                        method: 'post',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({
                            username: user.username,
                            isbn: book.isbn
                        })
                    })
                    .then(response => response.json())
                    .then(data =>  update_count())

                   
                    alert('Book requested');
                }
                else{
                    alert('Cannot request book');
                }
            }
        }
        else{
            alert('Cannot request book');;
        }
        setClicked(true);
        return;
    }

    const onRemoveBook = ()=>{
        fetch('http://localhost:5000/book_remove', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: user.username,
                isbn: book.isbn
            })
        })
        .then(response => response.json())
        .then(data => editBook())

    }

    const checkboxed = (event) =>{
        let updatedList = [...editCategories];
        if(event.target.checked){
            updatedList = [...editCategories,event.target.value];
        }
        else{
            updatedList.splice(editCategories.indexOf(event.target.value),1);
        }
        setEditCategories(updatedList);
    }


    const onEditBook = () =>{
        setEditMode(true);
    }

    const onEditSummary = (event)=>{
        setEditSummary(event.target.value);
    }

    const onEditCover = (event)=>{
        setEditCover(event.target.value);
    }

    const onEditKeywords = (event)=>{
        setEditKeywords(event.target.value.split(','));
    }

    const onEditAuthors = (event)=>{
        setEditAuthors(event.target.value.split(','));
    }

    const onEditTitle = (event)=>{
        setEditTitle(event.target.value);
    }

    const onEditPublisher = (event) =>{
        setEditPublisher(event.target.value);
    }


    const onEditCopies = (event) =>{
        setEditCopies(Number(event.target.value));
    }

    const onEditPageCount = (event) =>{
        setEditPageCount(Number(event.target.value));
    }


    const onCancelEdit = () =>{
        setEditAuthors([]);
        setEditCategories([]);
        setEditCover('');
        setEditSummary('');
        setEditTitle('');
        setEditKeywords([]);
        setEditPublisher('');
        setEditCopies(0);
        setEditPageCount(0);
        setEditMode(false);
    }
    
    const onSubmitEdit = () =>{
        if(editAuthors.length > 0 && editCategories.length > 0 && editKeywords.length > 0 && editCover !== '' && editTitle !== '' && editSummary !== '' && editPublisher !== ''){
            fetch('http://localhost:5000/edit_book', {
                        method: 'put',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({
                            title: editTitle,
                            summary: editSummary,
                            cover:editCover,
                            keywords: editKeywords,
                            authors: editAuthors,
                            categories: editCategories,
                            publisher: editPublisher,
                            copies: editCopies,
                            page_count: editPageCount,
                            isbn: book.isbn,
                            username: user.username

                        })
                    })
                    .then(response => response.json())
                    .then(data =>  {
                        editBook();
                        onCancelEdit();
                    })
        }
        else{
            alert('Fill everything properly')
        }
    }

    return(
        <div>
            <h1 className='book_title'>{`${book.title.toUpperCase()}`}</h1>
            <div className='book_info'>
                <img alt='' src={`${book.cover_m}`} width='400px' height='700px'/> 
                <ul key={reviews} className='book_details'>
                    <li className='description'>
                        <p>{`${book.summary}`}</p>
                    </li>
                    <li className='rest'>
                        <p>{`${book.keywords}`}</p>
                    </li>
                    <li className='rest'>
                        <p>Author(s): {`${book.authors}`}</p>
                    </li>
                    <li className='rest'>
                        <p>{`Categories: ${book.category}`}</p>
                    </li>
                    <li className='rest'>
                        <span>{`Published by: ${book.publisher}`}</span>
                    </li>
                    <li>
                        {
                        (user.role !== 'Admin'
                        ?    <button className='submit_review' onClick={() => {onRequestBook();}} >Request book!</button>
                        :   (editMode===false
                            ?    <button className='submit_review' onClick={()=>onEditBook()} >Edit Book</button>
                            :   <div className='edit_info'>
                                    <input placeholder='Insert title...' onChange={onEditTitle}/>
                                    <input placeholder='Insert cover url...' onChange={onEditCover}/>
                                    <input placeholder='Insert short summary...' onChange={onEditSummary}/>
                                    <input placeholder='Insert a few keywords...' onChange={onEditKeywords}/>
                                    <input placeholder='Insert Authors...' onChange={onEditAuthors}/>
                                    <div>
                                        {
                                            checkList.map((element,index)=>(
                                                <div key={index} className='checkboxes'>
                                                    <input type='checkbox' value={element} onChange={checkboxed}/>
                                                    <label>{element}</label>
                                                </div>
                                            )
                                            )
                                        }
                                    </div>
                                    <input placeholder='Insert publisher...' onChange={onEditPublisher}/>
                                    <input placeholder='Insert copies...' onChange={onEditCopies}/>
                                    <input placeholder='Insert Page count ...' onChange={onEditPageCount}/>
                                    <button onClick={() => onSubmitEdit()}>Submit</button>
                                    <button onClick={()=> onCancelEdit()}>Cancel</button>
                                </div>
                            )
                        )
                        }   
                    </li>
                    {hasReviewed === false && user.role !== 'Admin'
                    ? (
                    <li className='review_container'>
                        <h3 className='review_header'>Review</h3>
                        <ul className='review_container'>
                            <span className='review_header'>0(Terrible!)</span>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='0' /></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='1'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='2'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='3'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='4'/></li>
                            <li><input onChange={onLikertChange} type='radio' name='likert' value='5'/></li>
                            <span className='review_header'>5(Fantastic!)</span>
                        </ul>
                        <div>
                            <textarea onChange={onReviewChange} className='review_description' type='text' placeholder='Tell us your thoughts on this book!...'></textarea>
                        </div>
                        <button onClick={onSubmitReview} className='submit_review'>Submit</button>
                    </li>)
                    : (user.role !== 'Admin'
                        ?   <p className='rest'>Already Reviewed!</p>
                        :   <button className='submit_review remove_book' onClick={()=> onRemoveBook()}>Remove Book from Database</button>
                        )
                    }   
                </ul>
                <div>
                    <p className='review_header2'>Other User Reviews:</p>
                    <div className='review_box'> 
                    {
                        reviews.map((review,index) => {
                            return(
                                <Reviews key={index} showMeanBool={false} show_desc={true} show_title={false} title={''} date={review.review_date} submited_by={review.first_name.concat(' ',review.last_name)} score={review.score} desc={review.description}/>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Book;