import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarAdmin from '../../components/navbarAdmin';
import UserContext from '../usercontext';
import axios from 'axios';
import "../../css/admin/guest_room_admin.css";

function GuestRoom_Admin() {
    const { state } = useLocation();
    // const { id } = state || {};
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [occupant_name, SetOccupantName] = useState('');
    const [phone_no, SetPhoneNo] = useState('');
    const [start_date, SetStartDate] = useState('');
    const [end_date, SetEndDate] = useState('');
    const [type, setType] = useState('');
    const [status, SetStatus] = useState('');
    const [request_date, SetRequestDate] = useState('');
    const [selectedGuestRoomRequest, setSelectedGuestRoomRequest] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/guest_room_requests_admin', {
                    params: { occupant_name, phone_no, start_date, end_date, type, status, request_date }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [occupant_name, phone_no, start_date, end_date, type, status, request_date]);

    const handleTypeInput = (e) => {
        setType(e.target.value);
    };

    const handleOccupantInput = (e) => {
        SetOccupantName(e.target.value);
    };

    const handlePhoneNoInput = (e) => {
        SetPhoneNo(e.target.value);
    };

    const handleStatusInput = (e) => {
        SetStatus(e.target.value);
    };

    const handleItemClick = (guest_room_request) => {
        setSelectedGuestRoomRequest(guest_room_request);
    };

    const handleMarkApproved = async () => {
        if (!selectedGuestRoomRequest) return;

        try {
            await axios.put('http://localhost:3001/api/guest_room_requests_admin_approve', {
                occupant_name: selectedGuestRoomRequest.occupant_name,
                user: user.id
            });

            // Fetch the updated data after marking as resolved
            const response = await axios.get('http://localhost:3001/api/guest_room_requests_admin', {
                params: { occupant_name, phone_no, start_date, end_date, type, status, request_date }
            });
            setData(response.data);
            setSelectedGuestRoomRequest(null);
        } catch (error) {
            console.error('Error marking as resolved:', error);
        }
    };

    const handleMarkReject = async () => {
        if (!selectedGuestRoomRequest) return;

        try {
            await axios.put('http://localhost:3001/api/guest_room_requests_admin_reject', {
                occupant_name: selectedGuestRoomRequest.occupant_name,
                user: user.id
            });

            // Fetch the updated data after marking as resolved
            const response = await axios.get('http://localhost:3001/api/guest_room_requests_admin', {
                params: { occupant_name, phone_no, start_date, end_date, type, status, request_date }
            });
            setData(response.data);
            setSelectedGuestRoomRequest(null);
        } catch (error) {
            console.error('Error marking as resolved:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedGuestRoomRequest(null);
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

    return (
        <div className='guest_room_admin_main'>
            <NavBarAdmin />
            <div className='guest_room_admin_inner'>
                <div className='guest_room_admin_selectors'>
                    <div className='guest_room_filter_section filter_section'>
                        {/* NOTE: Putting no filter for end_date and request_date (as of now) */}
                        <input className='occupant_name_admin' onChange={handleOccupantInput} placeholder="Enter Occupant's Name" />
                        <input className='phone_no_admin' onChange={handlePhoneNoInput} placeholder="Enter Phone No." />
                        <input 
                            className='date_input_admin'
                            type='date' 
                            value={start_date}
                            onChange={(e) => SetStartDate(e.target.value)} 
                        />
                        {/* <input 
                            className='date_input_admin'
                            type='date' 
                            value={end_date}
                            onChange={(e) => SetEndDate(e.target.value)} 
                        /> */}
                        <select className='select_type_admin' value={type} onChange={handleTypeInput}>
                            <option value=''>All Types</option>
                            <option value='ac+bathroom'>AC + Bathroom</option>
                            <option value='ac'>AC</option>
                            <option value='non-ac'>Non-AC</option>
                        </select>
                        <select className='select_status_admin' value={status} onChange={handleStatusInput}>
                            <option value=''>All</option>
                            <option value='approved'>Approved</option>
                            <option value='pending'>Pending</option>
                            <option value='rejected'>Rejected</option>
                        </select>
                    </div>
                </div>
                <div className='guest_room_admin_filtered_requests'>
                    {data && (
                        <ul className='guest_room_items_admin'>
                            {data.map(item => (
                                <li 
                                    key={item.request_id} 
                                    className='guest_room_item_admin' 
                                    onClick={() => handleItemClick(item)}
                                >
                                    <p className='guest_room_occupant_name_admin'>Occupant's Name: {item.occupant_name}</p>
                                    <p className='guest_room_phone_no_admin'>Phone No.: {item.phone_no}</p>
                                    {/* <p className='guest_room_type_admin'>Room Type: {item.type}</p> */}
                                    <p className='guest_room_date_admin'>Start Date: {formatDate(item.start_date)}</p>
                                    <p className='guest_room_date_admin'>End Date: {formatDate(item.end_date)}</p>
                                    {/* <p className='guest_room_status_admin'>Status: {item.status}</p> */}
                                    <p className='guest_room_date_admin'>Request Date: {formatDate(item.request_date)}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedGuestRoomRequest && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <p>Occupant's Name: {selectedGuestRoomRequest.occupant_name}</p>
                            <p>Phone No.: {selectedGuestRoomRequest.phone_no}</p>
                            <p>Room Type: {selectedGuestRoomRequest.type}</p>
                            <p>Start Date: {new Date(selectedGuestRoomRequest.start_date).toLocaleDateString()}</p>
                            <p>End Date: {new Date(selectedGuestRoomRequest.end_date).toLocaleDateString()}</p>
                            <p>Request Date: {new Date(selectedGuestRoomRequest.request_date).toLocaleDateString()}</p>
                            <p>Status: {selectedGuestRoomRequest.status}</p>
                            {selectedGuestRoomRequest.status === 'pending' ? (
                                <>
                                    <button onClick={handleMarkApproved}>Approve</button>
                                    <button onClick={handleMarkReject}>Reject</button>
                                </>
                                ) : selectedGuestRoomRequest.status === 'approved'  ? (
                                    <button onClick={handleMarkReject}>Reject</button>
                                ) : (
                                    <button onClick={handleMarkApproved}>Approve</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GuestRoom_Admin
