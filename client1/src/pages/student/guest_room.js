import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarStudent';

function GuestRoom_Student(){
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();

    return(
        <div className='guest_room_student_main'>
            <NavBarStudent />
            <h1>guest_romom ${id}</h1>
        </div>
    );
}

export default GuestRoom_Student
