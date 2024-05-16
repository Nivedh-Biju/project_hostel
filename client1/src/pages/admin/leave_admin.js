import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from '../../components/navbarAdmin'; 
import UserContext from '../usercontext'; 
import axios from 'axios';
import "../../css/admin/leave_admin.css"; 

function LeaveAdmin() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null); // State for selected leave application
    const { user } = useContext(UserContext); // Assuming you have user authentication

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/leave_admin', {
                    params: { date, status }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [date, status]);

    const handleStatusInput = (e) => {
        console.log("setting status, "+e.target.value)
        setStatus(e.target.value);
    };

    const handleItemClick = (application) => {
        setSelectedApplication(application);
    };

    const handleApproveApplication = async () => {
        if (!selectedApplication) return;
    
        try {
            console.log(selectedApplication)
            await axios.put('http://localhost:3001/api/leave_admin_approve', {
                record_id: selectedApplication.record_id,
                admin_id: user.id
            }); 
            
            // Fetch the updated data after marking as approved
            const response = await axios.get('http://localhost:3001/api/leave_admin', {
                params: { date, status }
            });
            setData(response.data);
            setSelectedApplication(null);
        } catch (error) {
            console.log('Error marking as approved:'+ error);
        }
    };

    const handleRejectApplication = async () => {
        if (!selectedApplication) return;
    
        try {
            await axios.put('http://localhost:3001/api/leave_admin_reject', {
                record_id: selectedApplication.record_id,
                admin_id: user.id
            }); 
            
            // Fetch the updated data after marking as rejected
            const response = await axios.get('http://localhost:3001/api/leave_admin', {
                params: { date, status }
            });
            setData(response.data);
            setSelectedApplication(null);
        } catch (error) {
            console.error('Error marking as rejected:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedApplication(null);
    };

    return (
        <div className='leave_admin_main'>
            <NavBarAdmin />
            <div className='leave_admin_inner'>
                <div className='leave_admin_selectors'>
                    <div className='filter_section'>
                        <input 
                            className='date_input_admin'
                            type='date' 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />
                        <select className='select_status_admin' value={status} onChange={handleStatusInput}>
                            <option value=''>All</option>
                            <option value='Approved'>Approved</option>
                            <option value='Pending'>Pending</option>
                            <option value='Rejected'>Rejected</option>
                        </select>
                    </div>
                </div>
                <div className='leave_admin_filtered_applications'>
                    {data && (
                        <ul className='leave_items_admin'>
                            {data.map(application => (
                                <li 
                                    key={application.record_id} 
                                    className='leave_item_admin' 
                                    onClick={() => handleItemClick(application)}
                                >
                                    <p className='leave_id_admin'>Record ID: {application.record_id}</p>
                                    <p className='leave_roll_admin'>Roll No: {application.roll_no}</p>
                                    <p className='leave_date_admin'>Start Date: {new Date(application.start_date).toLocaleDateString()}</p>
                                    <p className='leave_status_admin'>Status: {application.status}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedApplication && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <p>Reason: {selectedApplication.reason}</p>
                            {selectedApplication.status === 'Pending' && (
                                <>
                                    <button onClick={handleApproveApplication}>Approve</button>
                                    <button onClick={handleRejectApplication}>Reject</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LeaveAdmin;
