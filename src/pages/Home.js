import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import {useSelector} from 'react-redux';

const Home = (props) => {
    const is_signup = useSelector(state=> state.user.is_signup);
    return (
        <React.Fragment>
            {is_signup?<Register/> : <Login/> }
        </React.Fragment>
    )
}

export default Home;