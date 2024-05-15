import React, { useContext } from 'react';
import NavBarAdmin from '../../components/navbarAdmin';
import UserContext from '../usercontext'; // Import the UserContext

function Home_Admin(){
    const { user } = useContext(UserContext); // Access user data from the context

    return(
        <div className='home_admin_main'>
            <NavBarAdmin />
            <h1>Good Morning {user.id}</h1>
        </div>
    );
}

export default Home_Admin;