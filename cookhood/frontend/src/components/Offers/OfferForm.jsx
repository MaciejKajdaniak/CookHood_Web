import { useState, useEffect } from 'react';
import axios from 'axios';

function OfferForm() {
    const [formData, setFormData] = useState({ title: '', category: 'meal', price: '' });
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            const file = e.target.files[0];
            setPhoto(file);
            if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('price', formData.price);
        if (photo) {
            data.append('photo', photo);
        }

        try {
            await axios.post('http://localhost:3000/api/offers/create-offer', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            alert('Oferta dodana pomyślnie!');
        } catch (err) {
            alert('Błąd przy dodawaniu oferty');
            console.error(err);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Tytuł:</label>
            <input id="title" name="title" placeholder="Tutaj wpisz co oferujesz" onChange={handleChange} required />

            <label htmlFor="category">Kategoria:</label>
            <select id="category" name="category" onChange={handleChange} required>
                <option value="meal">Posiłek</option>
                <option value="fruits">Owoce</option>
                <option value="vegetables">Warzywa</option>
                <option value="dairy">Nabiał</option>
                <option value="meat">Mięso</option>
                <option value="other">Inne</option>
            </select>

            <label htmlFor="photo">Zdjęcie:</label>
            <input id="photo" name="photo" type="file" accept="image/*" onChange={handleChange} required />

            {previewUrl && (
                <div style={{ margin: '10px 0' }}>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
            )}

            <label htmlFor="price">Cena:</label>
            <input id="price" name="price" type="number" placeholder="Cena za sztukę" min="0.01" step="0.01" onChange={handleChange} required />

            <button type="submit">Dodaj ofertę</button>
        </form>
    );
}

export default OfferForm;