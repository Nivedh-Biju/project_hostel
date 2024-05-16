import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from '../../components/navbarAdmin';
import UserContext from '../usercontext'; // Import the UserContext';
import "../../css/admin/home_admin.css";

function Manage_Hostel(){
    const { user } = useContext(UserContext); // Access user data from the context
    const navigate = useNavigate();
    return(
        <>
        <NavBarAdmin/>
        <div className='manage_hostel_main'>
            <h1>Good Morning {user.id}</h1>
        </div>
        </>
    );
}

export default Manage_Hostel;