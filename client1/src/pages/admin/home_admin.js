import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from '../../components/navbarAdmin';
import UserContext from '../usercontext'; // Import the UserContext';
import "../../css/admin/home_admin.css";

function Home_Admin(){
    const { user } = useContext(UserContext); // Access user data from the context
    const navigate = useNavigate();
    return(
        <>
        <NavBarAdmin/>
        <div className='home_admin_main'>
            <h1>Good Morning {user.id}</h1>
            <button onClick={ () => {navigate('/get_student');}}></button>
        </div>
        </>
    );
}

export default Home_Admin;