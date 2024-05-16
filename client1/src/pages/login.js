import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import UserContext from './usercontext';

function Login(){
    const navigate = useNavigate(); // Move useNavigate inside the component

    const [user, setUser] = useState({
        id: "",
        passwd: "",
        type: "student"
    });

    const { loginUser } = useContext(UserContext); // Use useContext here

    const handle_submit_student = () => {
        if (user.type === "student") {
            axios.post("http://localhost:3001/api/login_student", user)
                .then(res => res.data)
                .then(data => {
                    if (data.result === true) {
                        loginUser(user); // Set user data in the context
                        navigate('/home_student');
                    } else {
                        alert("Invalid Details");
                    }
                })
                .catch(error => {
                    console.error("Error logging in:", error);
                    alert("An error occurred while logging in. Please try again.");
                });
        }
    };

    const handle_submit_admin = () => {
        if (user.type === "admin") {
            axios.post("http://localhost:3001/api/login_admin", user)
                .then(res => res.data)
                .then(data => {
                    if (data.result === true) {
                        loginUser(user)
                        navigate('/home_admin');
                    } else {
                        alert("Invalid Details");
                    }
                })
                .catch(error => {
                    console.error("Error logging in:", error);
                    alert("An error occurred while logging in. Please try again.");
                });
        }
    };

    return(
        <div className='Login_main'>
            <div className='upper_label'>Hostel Portal</div>
            <div className='Login_inner'>
                <div className='select_type_login'>
                    <div className='select_student' onClick={() => {
                        setUser({...user, type: "student"});
                        handle_submit_student(); // Call handle_submit directly
                    }}>Student Login</div>
                    <div className='select_admin' onClick={() => {
                        setUser({...user, type: "admin"});
                        handle_submit_admin(); // Call handle_submit directly
                    }}>Admin Login</div>
                </div>
                <div className='id_input'>
                    <label className='id_label'>Enter User ID</label>
                    <input className='id_in' type='text' placeholder={user.id} onChange={e => setUser({...user , id: e.target.value})}></input>
                    <label className='passwd_label'>Enter User Password</label>
                    <input className ='passin' type='password' placeholder={user.passwd} onChange={e => setUser({...user, passwd: e.target.value})}></input>
                </div>
            </div>
        </div>
    );
}

export default Login;
