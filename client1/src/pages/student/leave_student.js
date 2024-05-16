import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarStudent';
import "../../css/student/leave_home.css";

function Leave_Student() {
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        // Fetch leave requests data from the server
        const fetchLeaveRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/leave_requests');
                setLeaveRequests(response.data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };

        fetchLeaveRequests();
    }, []);

    const handleClick = () => {
        navigate('/leave_application_student');
    };

    return (
        <div className='leave_application_main'>
            <NavBarStudent />
            <div className='leave_application_inner'>
                <button className='leave_application' onClick={handleClick}>Leave Application</button>
                <h1>All Leave Requests:</h1>
                <div className='leave_requests_list'>
                    {leaveRequests.length === 0 ? (
                        <p>No leave requests found.</p>
                    ) : (
                        <ul>
                            {leaveRequests.map(request => (
                                <li key={request.record_id}>
                                    <p>Request ID: {request.record_id}</p>
                                    <p>Roll No: {request.roll_no}</p>
                                    <p>Start Date: {request.start_date}</p>
                                    <p>End Date: {request.end_date}</p>
                                    <p>Reason: {request.reason}</p>
                                    <p>Status: {request.status}</p>
                                    <p>Application Date: {request.application_date}</p>
                                    <p>Admin ID: {request.admin_id}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Leave_Student;
