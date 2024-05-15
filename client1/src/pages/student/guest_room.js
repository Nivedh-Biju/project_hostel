import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarStudent';
import "../../css/guest_room.css";

function GuestRoom_Student(){
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/book_guest_room_student');
    };

    return(
        <div className='guest_room_student_main'>
            <NavBarStudent />
            {/* <h1>guest_romom ${id}</h1> */}
            <div className='guest_room_student_inner'>
                <button className='book_guest_room' onClick={handleClick}>Book Guest Room</button>
            </div>
        </div>
    );
}

export default GuestRoom_Student
