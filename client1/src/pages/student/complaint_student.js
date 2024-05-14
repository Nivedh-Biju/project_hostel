import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarStudent';
import "../../css/complaint_student.css";

function Complaint_Student(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/create_complaint_student');
    };

    return(
        <div className='complaint_student_main'>
            <NavBarStudent />
            <div className='complaint_student_inner'>
                <button className='create_complaint' onClick={handleClick}>Raise New Complaint</button>
            </div>
        </div>
    );
}

export default Complaint_Student;
