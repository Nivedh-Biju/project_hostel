import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarAdmin from '../../components/navbarAdmin';

function GuestRoom_Admin(){
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();

    return(
        <div className='guest_room_admin_main'>
            <NavBarAdmin />
            <h1>guest room Review</h1>
        </div>
    );
}

export default GuestRoom_Admin
