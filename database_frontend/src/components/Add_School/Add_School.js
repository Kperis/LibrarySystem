import React,{useState,useEffect} from "react";
import './Add_School.css';


const Add_School = () =>{

    const [school_name, setSchoolName] = useState('');
    const [school_city, setSchoolCity] = useState('');
    const [school_email, setSchoolEmail] = useState('');
    const [school_phone1, setSchoolPhone1] = useState('');
    const [school_phone2, setSchoolPhone2] = useState('');
    const [school_phone3, setSchoolPhone3] = useState('');
    const [school_address,setSchoolAddress] = useState('');


    const onSchoolNameChange = (event) =>{
        setSchoolName(event.target.value);
    }

    const onSchoolCityChange = (event) =>{ 
        setSchoolCity(event.target.value);
    }

    const onSchoolEmailChange = (event) =>{
        setSchoolEmail(event.target.value);
    }

    const onSchoolPhone1Change = (event) =>{
        setSchoolPhone1(event.target.value);
    }

    const onSchoolPhone2Change = (event) =>{
        setSchoolPhone2(event.target.value);
    }

    const onSchoolPhone3Change = (event) =>{
        setSchoolPhone3(event.target.value);
    }

    const onSchoolAddressChange = (event) =>{
        setSchoolAddress(event.target.value);
    }

    const onSubmitSchool = () =>{
        if(school_name !== '' && school_city !== '' && school_address !== '' && school_email !== ''){
            fetch('http://localhost:5000/main_admin/add_school', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    school_name: school_name,
                    school_city:school_city,
                    school_email: school_email,
                    school_address: school_address,
                    school_phone1: school_phone1,
                    school_phone2:school_phone2,
                    school_phone3: school_phone3
                })
                })
                .then(response => response.json())
                .then(data => alert('School successfully added'))
        }
        else{
            alert('fill everything')
        }

        setSchoolName('');
        setSchoolCity('');
        setSchoolAddress('');
        setSchoolEmail('');
        setSchoolPhone1('');
        setSchoolPhone2('');
        setSchoolPhone3('');

    }


    return(
        <div className="add_school_form_container">
            <label>School Name:</label>
                <input  
                    type='text' 
                    name='school_name' 
                    id='school_name' 
                    value={school_name}
                    onChange={onSchoolNameChange}/>
            <label>School City:</label>
                <input  
                    type='text' 
                    name='school_city' 
                    id='school_city' 
                    value={school_city}
                    onChange={onSchoolCityChange}/>
            <label>School email:</label>
                <input  
                    type='email' 
                    name='school_email' 
                    id='school_email' 
                    value={school_email}
                    onChange={onSchoolEmailChange}/>
            <label>School Phone 1:</label>
                <input  
                    type='tel' 
                    name='school_phone' 
                    id='school_phone' 
                    value={school_phone1}
                    onChange={onSchoolPhone1Change}
                    maxLength={10}
                    minLength={10}
                    />
            <label>School Phone 2:</label>
                <input  
                    type='tel' 
                    name='school_phone' 
                    id='school_phone' 
                    value={school_phone2}
                    onChange={onSchoolPhone2Change}
                    maxLength={10}
                    minLength={10}
                    />
            <label>School Phone 3:</label>
                <input  
                    type='tel' 
                    name='school_phone' 
                    id='school_phone' 
                    value={school_phone3}
                    onChange={onSchoolPhone3Change}
                    maxLength={10}
                    minLength={10}
                    />
            <label>School Address:</label>
                <input  
                    type='text' 
                    name='school_address' 
                    id='school_address' 
                    value={school_address}
                    onChange={onSchoolAddressChange}/>
            <button onClick={() => onSubmitSchool()}>Add</button>
        </div>
    )
}


export default Add_School;