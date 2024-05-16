import React, { useState, useEffect } from "react";
import NavBarAdmin from "../../components/navbarAdmin";
import "../../css/get_student_admin.css"; // Reuse the same CSS file
import axios from "axios";

function GetStudent() {
    const [roll_no, setRollNo] = useState('');
    const [hostel, setHostel] = useState('');
    const [room_no, setRoomNo] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/get_students_admin', {
                    params: { roll_no, hostel, room_no }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [roll_no, hostel, room_no]);


    const handleRollInput = (e) => {
        setRollNo(e.target.value);
    };

    const handleHostelInput = (e) => {
        setHostel(e.target.value);
    };

    const handleRoomInput = (e) => {
        setRoomNo(e.target.value);
    };

    return (
        <div className="get_student_main">
            <NavBarAdmin />
            <div className="get_student_selectors">
                <input 
                    className='roll_no_admin_get_student' 
                    onChange={handleRollInput} 
                    placeholder='Enter Roll No.' 
                />
                <select 
                    className='select_hostel_admin' 
                    value={hostel} 
                    onChange={handleHostelInput}
                >
                    <option value=''>Select Hostel</option>
                    <option value='jasmine'>Jasmine</option>
                    <option value='jasmine_annex'>Jasmine Annex</option>
                    <option value='ashwatha'>Ashwatha</option>
                    <option value='ashoka'>Ashoka</option>
                    <option value='banayan'>Banayan</option>
                    <option value='lotus'>Lotus</option>
                </select>
                <input 
                    className="room_no_admin_get_student" 
                    placeholder="Enter Room Number" 
                    onChange={handleRoomInput}
                />
            </div>

            <div className="filtered_get_students">
                {data && (
                            <ul className='student_details_get_students'>
                                {data.map(item => (
                                    <li 
                                        key={item.complaint_id} 
                                        className='get_student_filtered_admin' 
                                    >
                                        <p className='roll_no_get_students'>Roll No: {item.roll_no}</p>
                                        <p className='name_get_students'>Name: {item.name}</p>
                                        <p className='phone_no_get_students'>Phone No: {item.phone_no}</p>
                                        <p className='family_no_get_students'>Family No: {item.family_contact_no}</p>
                                        <p className='address_get_students'>Address: {item.address}</p>
                                        <p className='sex_get_students'>Gender: {item.sex}</p>
                                        <p className='hostel_get_students'>Hostel: {item.hostel_name}</p>
                                        <p className='room_no_get_students'>Room No: {item.room_no}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
            </div>
        </div>
    );
}

export default GetStudent;
