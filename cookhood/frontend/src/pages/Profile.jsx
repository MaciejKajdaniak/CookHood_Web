import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar.jsx';
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/offers');
                setOffers(res.data);
            } catch (err) {
                console.error('Błąd podczas pobierania ofert:', err);
            }
        };
        fetchOffers();
    }, []);

    return (
        <div style={s.bgPage}>
            <Navbar />
            <div style={s.mainPad}>
                <div style={s.userBox}>
                    <h1 style={s.userName}>{user.name}</h1>
                    <p style={s.userEmail}>{user.email}</p>
                    <button onClick={handleLogout} style={s.outBtn}>
                        Wyloguj się
                    </button>
                </div>

                <h2 style={s.myTitle}>Twoje oferty</h2>
                <div style={s.grid}>
                    {offers.filter(o => o.userId === user.id).map(o => (
                        <div key={o.id} style={s.offerBox}>
                            {o.photo && (
                                <img
                                    src={`http://localhost:3000/uploads/${o.photo}`}
                                    alt={o.title}
                                    style={s.offerImg}
                                />
                            )}
                            <div style={s.offerText}>
                                <h3 style={s.offerName}>{o.title}</h3>
                                <p><strong>Kategoria:</strong> {o.category}</p>
                                <p><strong>Cena:</strong> {o.price} zł</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;

const s = {
    bgPage: {
        backgroundColor: '#f2fef4',
        minHeight: '100vh'
    },
    mainPad: {
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
    },
    userBox: {
        backgroundColor: '#e0f7e9',
        borderRadius: '14px',
        padding: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        boxShadow: '0 3px 12px rgba(0,0,0,0.1)'
    },
    userName: {
        color: '#2b7a2b',
        marginBottom: '0.5rem'
    },
    userEmail: {
        color: '#666'
    },
    outBtn: {
        marginTop: '1rem',
        padding: '0.5rem 1.2rem',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    myTitle: {
        color: '#388e3c',
        marginBottom: '1.5rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.5rem'
    },
    offerBox: {
        backgroundColor: '#fff',
        border: '1px solid #c8e6c9',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        overflow: 'hidden'
    },
    offerImg: {
        width: '100%',
        height: '180px',
        objectFit: 'cover'
    },
    offerText: {
        padding: '1rem'
    },
    offerName: {
        margin: '0 0 0.5rem 0'
    }
};
