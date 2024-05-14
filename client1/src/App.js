import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Home_Admin from './pages/admin/home_admin';
import Home_Student from './pages/student/home_student';
import Leave_Student from './pages/student/leave_student';
import Complaint_Student from './pages/student/complaint_student';
import GuestRoom_Student from './pages/student/guest_room';
import CreateComplaintStudent from './pages/student/create_complaint_student';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element ={<Login />} />
          <Route path = "/home_student" element = {<Home_Student />} />
          <Route path = "/home_admin" element = {<Home_Admin />} />
          <Route path = "/leave_student" element = {<Leave_Student />} />
          <Route path = "/complaint_student" element = {<Complaint_Student/>} />
          <Route path = "/guest_room_student" element = {<GuestRoom_Student />} />
          <Route path = "/create_complaint_student" element = {<CreateComplaintStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
