import React from 'react';
import Navbar from '../components/Shared/Navbar.jsx';
import LoginForm from '../components/Auth/LoginForm';

function Login(){
    return(
        <div>
            <Navbar />
            <LoginForm />
        </div>
    );
}

export default Login;
