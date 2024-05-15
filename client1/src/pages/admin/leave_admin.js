import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarAdmin from '../../components/navbarAdmin';

function Leave_Admin(){
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();

    return(
        <div className='leave_admin_main'>
            <NavBarAdmin />
            <h1>leave Review{id}</h1>
        </div>
    );
}

export default Leave_Admin