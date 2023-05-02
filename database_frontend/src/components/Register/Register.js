import React,{ useEffect, useState } from 'react';
import './Register.css';


const Register = ({onRouteChange}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [role, setRole] = useState('')

    const onSubmitRegister = () =>{
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: username,
                password:password,
                first_name: first_name,
                last_name: last_name,
                birthday: birthday,
                role:role
            })
            
        })
    }

    const onFirstNameChange = (event) => {
		setFirstName(event.target.value);
	}

    const onLastNameChange = (event) => {
		setLastName(event.target.value);
	}

    const onUsernameChange = (event) => {
		setUsername(event.target.value);
	}

    const onPasswordChange = (event) => {
		setPassword(event.target.value);
	}

    const onBirthdayChange = (event) => {
		setBirthday(event.target.value);
	}

    const onRoleChange = (event) => {
		setRole(event.target.value);
	}


    return(
        <div>
            <p className='btn' onClick={() => onRouteChange('signin')}>Sign In</p>
            <h2 className='register_header'>Register</h2>
            <div className='register_form_box'>
                <label className='register_label'>Username:</label>
                <input 
                    className='register_input' 
                    type='text' 
                    name='username' 
                    id='username' 
                    onChange={onUsernameChange}/>
                <label className='register_label'>First Name:</label>
                <input 
                    className='register_input' 
                    type='text' 
                    name='first_name' 
                    id='first_name' 
                    onChange={onFirstNameChange}/>
                <label className='register_label'>Last Name:</label>
                <input 
                    className='register_input' 
                    type='text' 
                    name='last_name' 
                    id='last_name'
                    onChange={onLastNameChange}
                    />
                <label className='register_label'>Date of Birth</label>
                <input 
                    className='register_date' 
                    type='date' 
                    name='birthday' 
                    id='birthday'
                    onChange={onBirthdayChange}
                    />
                <span className='radio_title'>Role:</span>
                <div className='type_select' >
                    <input 
                        className='radio_btn' 
                        type='radio' 
                        name='role'
                        value='student'
                        onChange={onRoleChange}
                        />
                    <label className='radio_label'>Student</label>
                    <input 
                        className='radio_btn' 
                        type='radio' 
                        name='role'
                        value='teacher'
                        onChange={onRoleChange}
                        />
                    <label className='radio_label'>Teacher</label>
                    <input 
                        className='radio_btn' 
                        type='radio' 
                        name='role'
                        value='admin'
                        onChange={onRoleChange}
                        />
                    <label className='radio_label'>Admin</label>
                </div>
                <label className='register_label'>Password:</label>
                <input 
                    className='register_input' 
                    type='text' 
                    name='password' 
                    id='password'
                    onChange={onPasswordChange}/>
                <input 
                    className='register_button' 
                    type='submit' 
                    value='Register' 
                    onClick={onSubmitRegister}/>
            </div>
        </div>
    );
}

export default Register;