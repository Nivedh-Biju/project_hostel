import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../pages/usercontext'; // Import the UserContext
import "../css/nav_bar_students.css";

function NavBarStudent(){
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useContext(UserContext); // Access logoutUser function from the context

  const handleLogout = () => {
    logoutUser(); // Call logoutUser function from the context
    navigate('/'); // Redirect to the login page after logout
  };

  return(
    <div className='navbar_main'>
      <ul>
        <li><button onClick={() => navigate('/home_student')} className={location.pathname === '/home_student' ? 'active' : ''}>Home</button></li>
        <li><button onClick={() => navigate('/leave_student')} className={location.pathname === '/leave_student' ? 'active' : ''}>Leave</button></li>
        <li><button onClick={() => navigate('/complaint_student')} className={location.pathname === '/complaint_student' ? 'active' : ''}>Complaint</button></li>
        <li><button onClick={() => navigate('/guest_room_student')} className={location.pathname === '/guest_room_student' ? 'active' : ''}>Guest Room</button></li>
        <li className='logout'><button onClick={handleLogout} className={location.pathname === '/' ? 'active' : ''}>Logout</button></li>
      </ul>
    </div>
  );
}

export default NavBarStudent;
