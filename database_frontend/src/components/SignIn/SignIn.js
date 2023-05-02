import React from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return(
        <div>
            <h2 className='signin_header'>Sign In</h2>
            <div className='form_box'>
                <label className='signin_label'>Username:</label>
                <input className='signin_input' type='text'/>
                <label className='signin_label'>Password:</label>
                <input className='signin_input' type='password'/>
                <button className='login_button'>
                    <Link to='/home'>Log in</Link>
                </button>
            </div>
        </div>
    );
}

export default SignIn;