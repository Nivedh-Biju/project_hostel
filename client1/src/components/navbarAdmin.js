import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../pages/usercontext'; // Import the UserContext
import "../css/nav_bar_admin.css";

function NavBarAdmin(){
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useContext(UserContext); // Access logoutUser function from the context

  const handleLogout = () => {
    logoutUser(); // Call logoutUser function from the context
    navigate('/'); // Redirect to the login page after logout
  };

  return(
    <div className='navbar_admin_main'>
      <ul>
        <li><button onClick={() => navigate('/home_admin')} className={location.pathname === '/home_admin' ? 'active' : ''}>Home</button></li>
        <li><button onClick={() => navigate('/manage_hostel')} className={location.pathname === '/manage_hostel' ? 'active' : ''}>Hostel</button></li>
        <li><button onClick={() => navigate('/leave_admin')} className={location.pathname === '/leave_admin' ? 'active' : ''}>Leave</button></li>
        <li><button onClick={() => navigate('/complaint_admin')} className={location.pathname === '/complaint_admin' ? 'active' : ''}>Complaint</button></li>
        <li><button onClick={() => navigate('/guest_room_admin')} className={location.pathname === '/guest_room_admin' ? 'active' : ''}>Guest Room</button></li>
        <li className='logout'><button onClick={handleLogout} className={location.pathname === '/' ? 'active' : ''}>Logout</button></li>
      </ul>
    </div>
  );
}

export default NavBarAdmin;
