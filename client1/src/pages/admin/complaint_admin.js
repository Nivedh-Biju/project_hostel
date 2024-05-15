import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarAdmin';

function Complaint_Student(){
    const navigate = useNavigate();

    return(
        <div className='complaint_student_main'>
            <NavBarStudent />
            <h1>Admin Complaint Review</h1>
        </div>
    );
}

export default Complaint_Student;