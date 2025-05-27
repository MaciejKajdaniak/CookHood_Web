import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token; //true/false


    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Strona główna</Link>
            <Link to="/offers" style={styles.link}>Oferty</Link>
            <Link to="/create-offer" style={styles.link}>Dodaj ofertę</Link>
            <Link to="/favorites" style={styles.link}>Ulubione</Link>
            <Link to="/about" style={styles.link}>O nas</Link>

            {isLoggedIn ? (
                <Link to="/profile" style={styles.link}>Profil</Link>
            ) : (
                <>
                    <Link to="/login" style={styles.link}>Zaloguj</Link>
                    <Link to="/register" style={styles.link}>Zarejestruj</Link>
                </>
            )}
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 20px',
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #ccc',
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
    }
};

export default Navbar;
