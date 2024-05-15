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
  
    // Format the date as a string (e.g., "12-31-2022")
    const formattedDate = `${year}-${month}-${date}`;

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [guestRequest, setGuestRequest] = useState({
        roll_no: user.id,
        date: formattedDate,
        type: "", // Initially empty
        occupant_name: "",
        phone_no: "",
        start_date: "",
        end_date: "",
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

                {/* Input fields for details */}
                <label className="type_label" style={{ display: guestRequest.type ? 'block' : 'none' }}>Enter Booking Details</label>

                <div className="input_row">
                    <label className="input_field_label" style={{ display: guestRequest.type ? 'block' : 'none' }}>Occupant's Name</label>
                    <input
                        className="occupant_name_input"
                        style={{ display: guestRequest.type ? 'block' : 'none' }}
                        type="text"
                        value={guestRequest.occupant_name}
                        onChange={(event) => setGuestRequest({ ...guestRequest, occupant_name: event.target.value })}
                    />
                </div>
                <div className="input_row">
                    <label className="input_field_label" style={{ display: guestRequest.type ? 'block' : 'none' }}>Phone Number</label>
                    <input
                        className="phone_no_input"
                        style={{ display: guestRequest.type ? 'block' : 'none' }}
                        type="tel"
                        value={guestRequest.phone_no}
                        onChange={(event) => setGuestRequest({ ...guestRequest, phone_no: event.target.value })}
                    />
                </div>
                <div className="input_row">
                    <label className="input_field_label" style={{ display: guestRequest.type ? 'block' : 'none' }}>Start Date</label>
                    <input
                        className="start_date_input"
                        style={{ display: guestRequest.type ? 'block' : 'none' }}
                        type="date" data-date="" data-date-format="DD MMMM YYYY"
                        value={guestRequest.start_date || formattedDate}
                        onChange={(event) => setGuestRequest({ ...guestRequest, start_date: event.target.value })}
                        />
                </div>
                <div className="input_row">
                    <label className="input_field_label" style={{ display: guestRequest.type ? 'block' : 'none' }}>End Date</label>
                    <input
                        className="end_date_input"
                        style={{ display: guestRequest.type ? 'block' : 'none' }}
                        type="date" data-date="" data-date-format="DD MMMM YYYY"
                        value={guestRequest.end_date || formattedDate}
                        onChange={(event) => setGuestRequest({ ...guestRequest, end_date: event.target.value })}
                    />
                </div>
                {/* Button to submit guestRequest */}
                <button className="submit_request" style={{ display: guestRequest.type ? 'block' : 'none' }} onClick={handlesubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default GuestHouseRequest;
// table Alloted_guest_house: guest_room(primary key), occupant_name, phone_no, start_date, end_date, transaction_id, amount_paid, status, admin_id(references Admin id)