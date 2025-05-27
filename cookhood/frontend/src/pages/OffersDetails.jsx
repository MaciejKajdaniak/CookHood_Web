import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar.jsx';
import axios from 'axios';

function OffersDetails(){
    const { id } = useParams();
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        axios.get(`/api/offers/${id}`)
            .then(res => setOffer(res.data))
            .catch(err => console.error('Błąd przy pobieraniu szczegółów:', err));
    }, [id]);

    if (!offer) return <div><Navbar /><p>Ładowanie...</p></div>;
    return (
        <div>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <h2>{offer.title}</h2>
                {offer.photo && (
                    <img
                        src={`/uploads/${offer.photo}`}
                        alt={offer.title}
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                    />
                )}
                <p>Kategoria: {offer.category}</p>
                <p>Cena: {offer.price} zł</p>
                <p>Użytkownik ID: {offer.userId}</p>
                <p>Dodano: {new Date(offer.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default OffersDetails;