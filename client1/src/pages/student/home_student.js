import React, { useContext } from 'react';
import NavBarStudent from '../../components/navbarStudent';
import UserContext from '../usercontext'; // Import the UserContext
import '../../css/home_student.css';

function Home_Student(){
    const { user } = useContext(UserContext); // Access user data from the context

    return(
        <>
        <NavBarStudent />
        <div className='home_student_main'>
            <h1 className='welcome'>Welcome <span style={{color:"blue"}}>{user.id}</span></h1> {/* Access user id from the user object */}
        </div>
        </>
    );
}

export default Home_Student;
