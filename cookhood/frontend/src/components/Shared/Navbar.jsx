import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Strona główna</Link>
            <Link to="/offers" style={styles.link}>Oferty</Link>
            <Link to="/create-offer" style={styles.link}>Dodaj ofertę</Link>
            <Link to="/favorites" style={styles.link}>Ulubione</Link>
            <Link to="/about" style={styles.link}>O nas</Link>
            <Link to="/profile" style={styles.link}>Profil</Link>
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