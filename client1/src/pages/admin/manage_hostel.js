import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from '../../components/navbarAdmin';
import UserContext from '../usercontext'; // Import the UserContext';
import "../../css/admin/manage_hostel.css";
import axios from 'axios'

function Manage_Hostel(){
    const { user } = useContext(UserContext); // Access user data from the context
    const navigate = useNavigate();

    const [roll_no, setRollNo] = useState('');
    const [hostel_name, setHostel] = useState('');
    const [room_no, setRoomNo] = useState('');

    const handleValues=()=>{
        setRollNo(document.getElementById("roll_num_input").value);
        setHostel(document.querySelector(".manage_hostel_select").value);
        setRoomNo(document.getElementById("room_num_input").value);
    }

    //Function which connects to the backend
    const allocate_room = (roll_no,hostel_name,room_no)=>{
        axios.post("http://localhost:3001/api/admin_allot_room",{
            roll_no,hostel_name,room_no
        })
        .then(res=>{
            alert("Room alloted");
        })
        .catch(error=>{
            console.error("Allotment failed:",error);
            alert("Room allotment failed");
        })
    }

    useEffect(()=>{
        //Make sure there are no room capacity violations
        const checkCapacity= async (total_capacity)=>{
            const response = await axios.get('http://localhost:3001/api/get_room_occupant_count',{
                params: {hostel_name,room_no}
            });
            let num_occupied=Number((response.data[0])['count']);
            if(total_capacity===num_occupied){
                alert('Room is at capacity');
            }
            else{
                allocate_room(roll_no,hostel_name,room_no)
            }
        }

        //Make sure there are no invalid hostel_name,room_no and roll_no
        const checkValid= async ()=>{
            try{
                let capacity=0;
                if(roll_no=="" && hostel_name=="" && room_no==""){
                    return;
                }
                const response=await axios.get('http://localhost:3001/api/get_hostel_detail',{
                    params: {hostel_name,room_no}
                });
                capacity=(response.data[0])['capacity'];
                if(hostel_name===(response.data[0])['hostel_name'] && room_no==(response.data[0])['room_no']){
                    const response=await axios.get('http://localhost:3001/api/student_detail',{
                        params: { roll_no }
                    });
                    if(roll_no===(response.data[0])['ROLL NUM']){
                        if((response.data[0])['GENDER']==='M' && hostel_name==='jasmine'){
                            alert("Invalid Hostel");
                        }
                        else if((response.data[0])['HOSTEL NAME']===null){
                            checkCapacity(capacity);
                        }
                        else{
                            alert(`Room already allocated for ${roll_no}`);
                        }
                    }
                }
            }
            catch(error){
                alert('Invalid Roll Number or Hostel Number');
                console.error('Error fetching data:',error);
            }
        }
        checkValid()
    },[roll_no,hostel_name,room_no]);

    return(
        <>
        <NavBarAdmin/>
        <div className='manage_hostel_main'>
            <div className='manage_hostel_student_info'>
                <input 
                    id='roll_num_input'
                    className='manage_hostel_input'
                    placeholder='Enter Roll No'
                />
                <select 
                    className='manage_hostel_select' 
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
                    id='room_num_input'
                    className="manage_hostel_input" 
                    placeholder="Enter Room Number" 
                />
            </div>
            <button onClick={handleValues}>Allocate</button>
        </div>
        </>
    );
}

export default Manage_Hostel;