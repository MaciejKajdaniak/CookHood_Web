import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import Navbar from '../components/Shared/Navbar.jsx';

function Register() {
    return (
        <div>
            <Navbar />
            <h2>Rejestracja</h2>
            <RegisterForm />
        </div>
    );
}

export default Register;
