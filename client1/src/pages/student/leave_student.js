import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarStudent';
import "../../css/leave_home.css";

function Leave_Student(){
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/leave_application_student');
    };

    return(
        <div className='leave_applciation_main'>
            <NavBarStudent />
            {/* <h1>guest_romom ${id}</h1> */}
            <div className='leave_applciation_inner'>
                <button className='leave_applciation' onClick={handleClick}>Leave Application</button>
            </div>
        </div>
    );
}

export default Leave_Student
