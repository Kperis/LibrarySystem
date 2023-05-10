import React, { useState} from 'react';
import './SignIn.css';

const SignIn = ({loadUser, onRouteChange}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    

    const onSubmitSignin = () =>{
        fetch('http://localhost:5000/signin', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(data => data.json())
        .then(user => {
            if(user.user_id){
                loadUser(user);
                onRouteChange('home');

            }
            else{
                console.log('Invalid username/password');
            }
        })
        .catch(console.log('fail'))
    }

    const onUsernameChange = (event) => {
		setUsername(event.target.value);
	}

    const onPasswordChange = (event) => {
		setPassword(event.target.value);
	}

    return(
        <div>
            <p className='btn' onClick={() => onRouteChange('register')}>Register</p>
            <h2 className='signin_header'>Sign In</h2>
            <div className='form_box'>
                <label className='signin_label'>Username:</label>
                <input 
                    className='signin_input' 
                    type='text'
                    onChange={onUsernameChange}
                    />
                <label className='signin_label'>Password:</label>
                <input 
                    className='signin_input' 
                    type='password'
                    onChange={onPasswordChange}
                    />
                <input 
                    className='login_button' 
                    type='submit' 
                    value='Log in' 
                    onClick={onSubmitSignin}/>
            </div>
        </div>
    );
}

export default SignIn;