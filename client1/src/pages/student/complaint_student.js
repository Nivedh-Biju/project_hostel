import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBarStudent from '../../components/navbarStudent';
import "../../css/complaint_student.css";
import UserContext from '../usercontext'; // Import the UserContext

function Complaint_Student() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [selectedDescription, setSelectedDescription] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/complaints', {
                    params: { user, date, type }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, date, type]);

    const handleClick = () => {
        navigate('/create_complaint_student');
    };

    const handleselectchange = (e) => {
        setType(e.target.value);
    };

    const handleDescriptionClick = (description) => {
        setSelectedDescription(description);
    };

    const handleCloseModal = () => {
        setSelectedDescription(null);
    };

    return (
        <div className='complaint_student_main'>
            <NavBarStudent />
            <div className='complaint_student_inner'>
                <button className='create_complaint' onClick={handleClick}>Raise New Complaint</button>
            </div>
            <div className='filter_section'>
                <input 
                    className='date_input'
                    type='date' 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                />
                <select className='select_type' value={type} onChange={handleselectchange}>
                    <option value=''>All Types</option>
                    <option value='plumbing'>Plumbing</option>
                    <option value='carpentry'>Carpentry</option>
                    <option value='LAN'>LAN</option>
                    <option value='electrical'>Electrical</option>
                    <option value='others'>Others</option>
                </select>
            </div>
            <div className='filtered_complaints'>
                {/* Render fetched data here */}
                {data && (
                    <ul className='complaint_items'>
                        {data.map(item => (
                            <li key={item.complaint_id} className='complaint_item'>
                                <p className='complaint_id'>serial: {item.complaint_id}</p>
                                <p className='complaint_type'>Type: {item.complaint_type}</p>
                                <p className='complaint_date'>Application Date: {new Date(item.application_date).toLocaleDateString()}</p>
                                <p className='complaint_description' onClick={() => handleDescriptionClick(item.description)}>Description: Click to view</p>
                                <p className='complaint_status'>Status: {item.resolve_date ? 'Resolved' : 'Not Resolved'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedDescription && (
                <div className={`complaint_description_modal ${selectedDescription ? 'active' : ''}`} onClick={handleCloseModal}>
                    <p>{selectedDescription}</p>
                </div>
            )}
        </div>
    );
}

export default Complaint_Student;
