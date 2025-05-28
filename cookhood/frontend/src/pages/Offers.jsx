import React, { useEffect, useState } from 'react';
import Navbar from '../components/Shared/Navbar.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchOffers();
    }, [category]);

    const fetchOffers = async () => {
        console.log('kategoria (mam już dość tych jebanych błędów):', category);
        try {
            const res = await axios.get('http://localhost:3000/api/offers', {
                params: { category }
            });
            console.log('url:', res.config.url);
            console.log('data:', res.data);
            setOffers(res.data);
        } catch (err) {
            console.error('Błąd podczas pobierania ofert:', err);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const addToFavorites = (offer) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const alreadyExists = favorites.some(f => f.id === offer.id);
        if (!alreadyExists) {
            favorites.push(offer);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert("Dodano ofertę do ulubionych");
        }
    };

    const goToDetails = (id) => {
        navigate(`/offers/${id}`);
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <h1>Oferty</h1>

                <div style={{ marginBottom: '20px' }}>
                    <label>Kategoria:&nbsp;</label>
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="">Wszystkie</option>
                        <option value="meal">Posiłki</option>
                        <option value="fruits">Owoce</option>
                        <option value="vegetables">Warzywa</option>
                        <option value="dairy">Nabiał</option>
                        <option value="meat">Mięso</option>
                        <option value="other">Inne</option>
                    </select>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {offers.map(offer => (
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
                            <button onClick={() => addToFavorites(offer)}>❤️ Ulubione</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Offers;
