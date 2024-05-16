import React, { useContext, useEffect, useState } from 'react';
import NavBarStudent from '../../components/navbarStudent';
import UserContext from '../usercontext'; // Import the UserContext
import '../../css/home_student.css';
import axios from 'axios';

function Home_Student(){
    const { user } = useContext(UserContext); // Access user data from the context

    const [detailHTML, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            let id=user.id;
            let passwd=user.passwd;
            const response = await axios.get('http://localhost:3001/api/student_detail', { 
                params: { id , passwd } 
            });
            return(response.data[0])
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(()=>{
        const interval = setInterval(async () => {
            const detailHTML=[];
            try {
                let list = await fetchData();
                Object.keys(list).forEach(key => {
                    detailHTML.push(
                        <>
                            <div className='row_heading'>{key}</div>
                            <div className='row_info'>{list[key]}</div>
                        </>
                    );             
                });
                setData(detailHTML);
                setLoading(false);
            }
            catch (error) {
                setError(error);
                setLoading(false);
            }
        },1000);
        return ()=>clearInterval(interval);
    });

    const DetailFill=()=>{
        if(loading){
            return <div>Loading...</div>
        }
        if(error){
            return <div>Error: {error.message}</div>;
        }
        return <>{detailHTML}</>
    }

    return(
        <>
        <NavBarStudent />
        <div className='home_student_main'>
            <h1 className='welcome'>Welcome <span style={{color:"blue"}}>{user.id}</span></h1> {/* Access user id from the user object */}
            <div className='student_details_table'>
                <DetailFill/>
            </div>
        </div>
        </>
    );
}

export default Home_Student;
