import React, { useContext, useState } from "react";
import UserContext from "../usercontext";
import axios from "axios";
import NavBarStudent from "../../components/navbarStudent";
import "../../css/student/leave_application.css";
import { useNavigate } from "react-router-dom";

function LeaveApplicationStudent() {
    const currentDate = new Date();
    const date = currentDate.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
    const year = currentDate.getFullYear();
  
    // Format the date as a string (e.g., "2022-12-31")
    const formattedDate = `${year}-${month}-${date}`;

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [leaveRecord, setLeaveRecord] = useState({
        roll_no: user.id,
        start_date: formattedDate,
        end_date: formattedDate,
        reason: "",
        status: "Pending", // Initial status
        application_date: formattedDate,
        admin_id: "" // Initially empty
    });

    

    const handlesubmit = () => {
        if (!leaveRecord.start_date || !leaveRecord.end_date) {
            alert("Please select start date and end date.");
            return;
        }
        
        if (!leaveRecord.reason) {
            alert("Please enter reason for leave.");
            return;
        }
    
        axios.post("http://localhost:3001/api/create_leave_request", leaveRecord)
        .then(response => {
            console.log("rando")
            if (response.status === 200) {
                console.log("Request was successful");
                console.log("Response data:", response.data);
                alert("Leave application submitted successfully!");
                navigate('/home_student');
            } else {
                console.log("Unexpected status code:", response.status);
            }
        })
        .catch(error => {
            console.error("Error submitting leave application:"+ error);
            alert("Failed to submit leave application. Please try again."+ error);
        });
        
    };
      
    return (
        <div className="create_leave_request_main">
    <NavBarStudent />
    <div className="create_leave_request_inner">
        <div className="create_leave_request_components">
            {/* Input field for reason */}
            <div className="input_row">
                <label className="input_field_label">Reason for Leave</label>
            </div>
            <div className="input_row">
                <input
                    className="reason_input"
                    type="text"
                    value={leaveRecord.reason}
                    onChange={(event) => setLeaveRecord({ ...leaveRecord, reason: event.target.value })}
                    placeholder="Subject For The Leave Request"
                />
            </div>
            {/* Input fields for start date and end date */}
            <div className="input_row">
                <label className="input_field_label">Start Date</label>
                <input
                    className="start_date_input"
                    type="date"
                    value={leaveRecord.start_date}
                    onChange={(event) => setLeaveRecord({ ...leaveRecord, start_date: event.target.value })}
                />
            </div>
            <div className="input_row">
                <label className="input_field_label">End Date</label>
                <input
                    className="end_date_input"
                    type="date"
                    value={leaveRecord.end_date}
                    onChange={(event) => setLeaveRecord({ ...leaveRecord, end_date: event.target.value })}
                />
            </div>
            {/* Button to submit leave application */}
            <button className="submit_request" onClick={handlesubmit}>Submit</button>
        </div>
    </div>
</div>
);
}

export default LeaveApplicationStudent;
