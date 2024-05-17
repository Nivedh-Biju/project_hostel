import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarAdmin';
import UserContext from '../usercontext';
import axios from 'axios';
import "../../css/admin/complaint_admin.css"; // Make sure to import your CSS file

function Complaint_Student() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [roll_no, SetRollNo] = useState('');
    const [resolved, SetResolved] = useState('');
    const [selectedComplaint, setSelectedComplaint] = useState(null); // State for selected complaint
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/complaints_admin', {
                    params: { date, type, roll_no, resolved }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [date, type, roll_no, resolved]);

    const handleTypeInput = (e) => {
        setType(e.target.value);
    };

    const handleRollInput = (e) => {
        SetRollNo(e.target.value);
    };

    const handleResolveInput = (e) => {
        SetResolved(e.target.value);
    };

    const handleItemClick = (complaint) => {
        setSelectedComplaint(complaint);
    };

    const handleMarkResolved = async () => {
        if (!selectedComplaint) return;
    
        try {
            await axios.put('http://localhost:3001/api/complaints_admin_resolve', {
                complaint_id: selectedComplaint.complaint_id,
                user: user.id
            }); 
            
            // Fetch the updated data after marking as resolved
            const response = await axios.get('http://localhost:3001/api/complaints_admin', {
                params: { date, type, roll_no, resolved }
            });
            setData(response.data);
            setSelectedComplaint(null);
        } catch (error) {
            console.error('Error marking as resolved:', error);
        }
    };
    
    const formatDate = (date) => {
        const d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1; // Months are zero indexed
        const year = d.getFullYear();
    
        if (day < 10) {
            day = '0' + day;
        }
    
        if (month < 10) {
            month = '0' + month;
        }
    
        return `${day}/${month}/${year}`;
    };

    const handleCloseModal = () => {
        setSelectedComplaint(null);
    };

    return (
        <div className='complaint_admin_main'>
            <NavBarStudent />
            <div className='complaint_admin_inner'>
                <div className='complaint_admin_selectors'>
                    <div className='filter_section'>
                        <input 
                            className='complaint_date_input_admin date_input_admin'
                            type='date' 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />
                        <input className='roll_no_admin' onChange={handleRollInput} placeholder='Enter Roll No.' />
                        <select className='select_type_admin' value={type} onChange={handleTypeInput}>
                            <option value=''>All Types</option>
                            <option value='plumbing'>Plumbing</option>
                            <option value='carpentry'>Carpentry</option>
                            <option value='LAN'>LAN</option>
                            <option value='electrical'>Electrical</option>
                            <option value='others'>Others</option>
                        </select>
                        <select className='select_resolved_admin' value={resolved} onChange={handleResolveInput}>
                            <option value=''>All</option>
                            <option value='true'>Resolved</option>
                            <option value='false'>Not Resolved</option>
                        </select>
                    </div>
                </div>
                <div className='complaint_admin_filtered_complaints'>
                    {data && (
                        <ul className='complaint_items_admin'>
                            {data.map(item => (
                                <li 
                                    key={item.complaint_id} 
                                    className='complaint_item_admin' 
                                    onClick={() => handleItemClick(item)}
                                >
                                    <p className='complaint_id_admin'>serial: {item.complaint_id}</p>
                                    <p className='complaint_roll_admin'>roll_no: {item.roll_no}</p>
                                    <p className='complaint_type_admin'>Type: {item.complaint_type}</p>
                                    <p className='complaint_date_admin'>Application Date: {formatDate(item.application_date)}</p>
                                    <p className='complaint_status_admin'>Status: {item.resolve_date ? 'Resolved' : 'Not Resolved'}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedComplaint && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <p>Description: {selectedComplaint.description}</p>
                            {selectedComplaint.resolve_date ? (
                                <p>Status: Marked Resolved</p>
                            ) : (
                                <button onClick={handleMarkResolved}>Mark as Resolved</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Complaint_Student;
