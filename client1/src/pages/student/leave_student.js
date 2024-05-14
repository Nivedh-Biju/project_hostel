import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarStudent';

function Leave_Student(){
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();

    return(
        <div className='leave_student_main'>
            <NavBarStudent />
            <h1>leave{id}</h1>
        </div>
    );
}

export default Leave_Student
