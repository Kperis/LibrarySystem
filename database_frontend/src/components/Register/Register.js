import React from 'react';
import './Register.css';
import {Link} from 'react-router-dom';

const Register = () => {
    return(
        <div>
           <h2 className='register_header'>Register</h2>
            <div className='register_form_box'>
                <label className='register_label'>Username:</label>
                <input className='register_input' type='text'/>
                <label className='register_label'>First Name:</label>
                <input className='register_input' type='text'/>
                <label className='register_label'>Last Name:</label>
                <input className='register_input' type='text'/>
                <label className='register_label'>Date of Birth</label>
                <input className='register_date' type='date'/>
                <span className='radio_title'>Role:</span>
                <div className='type_select'>
                    <input className='radio_btn' type='radio' name='role'/>
                    <label className='radio_label'>Student</label>
                    <input className='radio_btn' type='radio' name='role'/>
                    <label className='radio_label'>Teacher</label>
                    <input className='radio_btn' type='radio' name='role'/>
                    <label className='radio_label'>Admin</label>
                </div>
                <label className='register_label'>Password:</label>
                <input className='register_input' type='text'/>
                <button className='register_button'>
                    <Link to='/home'>Register</Link>
                </button>
            </div>
        </div>
    );
}

export default Register;