import React, { useEffect, useState } from 'react';
import Navbar from '../components/Shared/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

function Favorites(){
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        const stored = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(stored);
    }, []);

    const goToDetails = (id) => {
        navigate(`/offers/${id}`);
    };

    return(
        <div>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <h2>Ulubione oferty</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {favorites.map(offer => (
                        <div key={offer.id} style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '1rem',
                            backgroundColor: '#f9f9f9'
                        }}>
                            {offer.photo && (
                                <img
                                    src={`http://localhost:3000/uploads/${offer.photo}`}
                                    alt={offer.title}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => goToDetails(offer.id)}
                                />
                            )}
                            <h3 onClick={() => goToDetails(offer.id)} style={{ cursor: 'pointer' }}>
                                {offer.title}
                            </h3>
                            <p>Kategoria: {offer.category}</p>
                            <p>Cena: {offer.price} zł</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Favorites;