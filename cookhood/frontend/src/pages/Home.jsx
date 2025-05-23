import React from 'react';
import Navbar from '../components/Shared/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center' }}>
            <Navbar />
            <h1>Witamy w CookHood!</h1>
            <button onClick={() => navigate('/login')} style={{ margin: '10px' }}>
                Zaloguj się
            </button>
            <button onClick={() => navigate('/register')} style={{ margin: '10px' }}>
                Zarejestruj się
            </button>
        </div>
    );
};

export default Home;
