import React, { useContext } from 'react';
import NavBarStudent from '../../components/navbarStudent';
import UserContext from '../usercontext'; // Import the UserContext

function Home_Student(){
    const { user } = useContext(UserContext); // Access user data from the context

    return(
        <div className='home_student_main'>
            <NavBarStudent />
            <h1>welcome {user.id}</h1> {/* Access user id from the user object */}
        </div>
    );
}

export default Home_Student;
