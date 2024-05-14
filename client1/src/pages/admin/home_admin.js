import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Home_Admin(){
    const { state } = useLocation();
    const { id } = state || {};
    const navigate = useNavigate();

    return(
        <h1>welcome ${id}</h1>
    );
}

export default Home_Admin;