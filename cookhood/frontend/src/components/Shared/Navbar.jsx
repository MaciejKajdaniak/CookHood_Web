import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    return (
        <nav style={styles.nav}>
            <div style={styles.left}>
                <div style={styles.logo}>CookHood 🌿</div>
                <Link to="/" style={styles.link}>Strona główna</Link>
                <Link to="/offers" style={styles.link}>Oferty</Link>
                <Link to="/create-offer" style={styles.link}>Dodaj ofertę</Link>
                <Link to="/favorites" style={styles.link}>Ulubione</Link>
            </div>
            <div style={styles.right}>
                {isLoggedIn ? (
                    <Link to="/profile" style={styles.buttonProfile}>Profil</Link>
                ) : (
                    <>
                        <Link to="/login" style={styles.buttonLogin}>Zaloguj</Link>
                        <Link to="/register" style={styles.ButtonRegister}>Zarejestruj</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        backgroundColor: '#e8f5e9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    right: {
        display: 'flex',
        gap: '15px',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2e7d32',
        marginRight: '20px'
    },
    link: {
        textDecoration: 'none',
        color: '#2e7d32',
        fontWeight: '500',
        transition: 'color 0.2s',
    },
    buttonProfile: {
        textDecoration: 'none',
        backgroundColor: '#4CAF50',
        padding: '8px 16px',
        borderRadius: '20px',
        color: 'white',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease',
    },
    buttonLogin: {
        textDecoration: 'none',
        padding: '10px 20px',
        backgroundColor: '#66bb6a',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginRight: '10px',
    },
    ButtonRegister: {
        textDecoration: 'none',
        padding: '9px 20px',
        backgroundColor: 'transparent',
        color: '#66bb6a',
        border: '2px solid #66bb6a',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
    }
};

export default Navbar;
