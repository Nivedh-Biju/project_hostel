import React, { useContext, useState } from "react";
import UserContext from "../usercontext";
import axios from "axios";
import NavBarStudent from "../../components/navbarStudent";
import "../../css/student/create_complaint_student.css";
import { useNavigate } from "react-router-dom";

function CreateComplaintStudent() {
    const currentDate = new Date();
    const date = currentDate.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
    const year = currentDate.getFullYear();
  
    // Format the date as a string (e.g., "12/31/2022")
    const formattedDate = `${year}/${month}/${date}`;

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [complaint, setComplaint] = useState({
        roll_no: user.id,
        date: formattedDate,
        type: "", // Initially empty
        description: "",
    });

    // Handler function to update the complaint type
    const handleTypeSelection = (selectedType) => {
        setComplaint({ ...complaint, type: selectedType });
    };

    const handlesubmit = () => {
        if (complaint.type === "") {
          alert("Select type");
          return;
        }
      
        axios.post("http://localhost:3001/api/create_complaint", complaint)
          .then(res => {
            alert("Complaint lodged!");
            navigate('/home_student');
          })
          .catch(error => {
            console.error("Error lodging complaint:", error);
            alert("Failed to lodge complaint. Please try again.");
          });
      };
      


    return (
        <div className="create_complaint_main">
            <NavBarStudent />
            <div className="create_complaint_inner">
                <div className="create_complaint_components">
                {/* Divisions for selecting complaint type */}
                <label className="type_label">Complaint Type</label>
                <div className="complaint_types">
                    <div
                        className={`complaint_option ${complaint.type === "plumbing" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("plumbing")}
                    >
                        Plumbing
                    </div>

                    <div
                        className={`complaint_option ${complaint.type === "carpentry" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("carpentry")}
                    >
                        Carpentry
                    </div>

                    <div
                        className={`complaint_option ${complaint.type === "LAN" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("LAN")}
                    >
                        LAN
                    </div>

                    <div
                        className={`complaint_option ${complaint.type === "electrical" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("electrical")}
                    >
                        Electrical
                    </div>

                    <div
                        className={`complaint_option ${complaint.type === "others" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("others")}
                    >
                        Others
                    </div>
                </div>

                {/* Input field for description */}
                <label className="description_label">Description</label>
                <textarea
                    className="description_input"
                    type="textarea"
                    placeholder="Enter Description"
                    onChange={(e) => {
                        setComplaint({ ...complaint, description: e.target.value });
                    }}
                ></textarea>

                {/* Button to submit complaint */}
                <button className="submit_complaint" onClick={handlesubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateComplaintStudent;
