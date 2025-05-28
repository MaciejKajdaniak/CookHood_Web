import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar.jsx';
import axios from 'axios';

function OffersDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [offer, setOffer] = useState(null);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        axios.get(`/api/offers/${id}`)
            .then(res => setOffer(res.data))
            .catch(err => console.error('Błąd przy pobieraniu szczegółów:', err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token) {
                alert('Musisz się zalogować, aby wysłać wiadomość');
                navigate('/login');
                return;
            }

            await axios.post('http://localhost:3000/api/contactSeller', {
                offerId: offer.id,
                sellerId: offer.userId,
                message,
                buyerEmail: user.email,
                buyerName: user.name
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setNotification('Wiadomość wysłana pomyślnie!');
            setMessage('');
        } catch (err) {
            console.error('Błąd przy wysyłaniu wiadomości:', err);
            setNotification('Wystąpił błąd podczas wysyłania wiadomości');
        } finally {
            setIsSending(false);
        }
    };

    if (!offer) return <div><Navbar /><p>Ładowanie...</p></div>;

    return (
        <div>
            <Navbar />
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <h2>{offer.title}</h2>
                {offer.photo && (
                    <img
                        src={`http://localhost:3000/uploads/${offer.photo}`}
                        alt={offer.title}
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            marginBottom: '20px'
                        }}
                    />
                )}
                <p>Kategoria: {offer.category}</p>
                <p>Cena: {offer.price} zł</p>
                <p>Dodano: {new Date(offer.createdAt).toLocaleString()}</p>

                <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <h3>Skontaktuj się ze sprzedawcą</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Twoja wiadomość..."
                                style={{
                                    width: '100%',
                                    minHeight: '100px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSending}
                            style={{
                                padding: '10px 20px',
                                background: isSending ? '#ccc' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {isSending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                        </button>
                    </form>
                    {notification && <p style={{ marginTop: '10px', color: notification.includes('błąd') ? 'red' : 'green' }}>{notification}</p>}
                </div>
            </div>
        </div>
    );
}

export default OffersDetails;