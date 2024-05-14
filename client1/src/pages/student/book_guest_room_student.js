import React, { useContext, useState } from "react";
import UserContext from "../usercontext";
import axios from "axios";
import NavBarStudent from "../../components/navbarStudent";
import "../../css/book_guest_room_student.css";
import { useNavigate } from "react-router-dom";

function GuestHouseRequest() {
    const currentDate = new Date();
    const date = currentDate.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
    const year = currentDate.getFullYear();
  
    // Format the date as a string (e.g., "12/31/2022")
    const formattedDate = `${year}/${month}/${date}`;

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [guestRequest, setGuestRequest] = useState({
        roll_no: user.id,
        date: formattedDate,
        type: "", // Initially empty
        description: "",
    });

    // Handler function to update the guestRequest type
    const handleTypeSelection = (selectedType) => {
        setGuestRequest({ ...guestRequest, type: selectedType });
    };

    const handlesubmit = () => {
        if (guestRequest.type === "") {
          alert("Select type");
          return;
        }
      
        axios.post("http://localhost:3001/api/create_complaint", guestRequest)
          .then(res => {
            alert("Request lodged! You'll receive a mail on confirmation");
            navigate('/home_student');
          })
          .catch(error => {
            console.error("Error lodging guest house request:", error);
            alert("Failed to lodge guest house request. Please try again.");
          });
    };
      


    return (
        <div className="create_guest_request_main">
            <NavBarStudent />
            <div className="create_guest_request_inner">
                <div className="create_guest_request_components">
                {/* Divisions for selecting guestRequest type */}
                <label className="type_label">Guest Room Type</label>
                <div className="room_types">
                    <div
                        className={`guest_room_option ${guestRequest.type === "ac+bathroom" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("ac+bathroom")}
                    >
                        AC + Bathroom
                    </div>

                    <div
                        className={`guest_room_option ${guestRequest.type === "ac" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("ac")}
                    >
                        AC
                    </div>

                    <div
                        className={`guest_room_option ${guestRequest.type === "non-ac" ? "selected" : ""}`}
                        onClick={() => handleTypeSelection("non-ac")}
                    >
                        Non-AC
                    </div>
                </div>

                {/* Input field for description */}
                <label className="description_label">Reason for booking</label>
                <textarea
                    className="description_input"
                    type="textarea"
                    placeholder="Enter Description"
                    onChange={(event) => {
                        setGuestRequest({ ...guestRequest, description: event.target.value });
                    }}
                ></textarea>

                {/* Button to submit guestRequest */}
                <button className="submit_request" onClick={handlesubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default GuestHouseRequest;
// table Alloted_guest_house: guest_room(primary key), occupant_name, phone_no, start_date, end_date, transaction_id, amount_paid, status, admin_id(references Admin id)