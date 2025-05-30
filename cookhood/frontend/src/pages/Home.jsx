import React from 'react';
import Navbar from '../components/Shared/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <Navbar />

            <section style={styles.MainSection}>
                <div style={styles.MainContent}>
                    <h1 style={styles.heading}>Kupuj lokalnie. Ratuj jedzenie.</h1>
                    <p style={styles.subtext}>CookHood to miejsce, gdzie znajdziesz i wystawisz lokalne produkty spożywcze — świeże, domowe, z lokalnych farm.</p>
                    <div>
                        <button style={styles.button} onClick={() => navigate('/login')}>Zaloguj się</button>
                        <button style={styles.RegisterButton} onClick={() => navigate('/register')}>Zarejestruj się</button>
                    </div>
                </div>
                <img
                    src="/main.jpg"
                    alt="Produkty lokalne"
                    style={styles.MainImage}
                />
            </section>

            <section style={styles.Section}>
                <h2>Dlaczego warto?</h2>
                <div style={styles.List}>
                    <div style={styles.infoDiv}>
                        <img src="/section1.jpg" style={styles.Image} alt="przetwory" />
                        <h3>Zero marnowania</h3>
                        <p>Umożliwiamy sprzedaż nadmiarowej żywności z gospodarstw i kuchni – zanim się zmarnuje.</p>
                    </div>
                    <div style={styles.infoDiv}>
                        <img src="/section2.webp" style={styles.Image} alt="warzywa" />
                        <h3>Wsparcie lokalnych</h3>
                        <p>Wspierasz lokalnych producentów i sąsiadów – to, co bliskie, jest najlepsze.</p>
                    </div>
                    <div style={styles.infoDiv}>
                        <img src="/section3.jpeg" style={styles.Image} alt="targ" />
                        <h3>Zdrowo i ekologicznie</h3>
                        <p>Mniej transportu, mniej plastiku, więcej natury. Twoje zakupy mają znaczenie.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'sans-serif',
        backgroundColor: '#f9fef9',
        color: '#2e2e2e',
    },
    MainSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '60px 10%',
        backgroundColor: '#e8f5e9',
    },
    MainContent: {
        maxWidth: '50%',
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '20px',
        color: '#2e7d32',
    },
    subtext: {
        fontSize: '1.2rem',
        marginBottom: '30px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#66bb6a',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginRight: '10px',
    },
    RegisterButton: {
        padding: '9px 20px',
        backgroundColor: 'transparent',
        color: '#66bb6a',
        border: '2px solid #66bb6a',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    MainImage: {
        width: '40%',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
    Section: {
        padding: '60px 10%',
        textAlign: 'center',
    },
    List: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px',
        gap: '30px',
        flexWrap: 'wrap',
    },
    infoDiv: {
        width: '300px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    Image: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '15px',
    },
};

export default Home;
