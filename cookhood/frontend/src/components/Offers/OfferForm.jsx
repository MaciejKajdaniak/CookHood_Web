import {useState} from 'react';
import axios from 'axios';

function OfferForm(){
    const [formData, setFormData] = useState({title:'', category:'meal', price: ''});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/offers/create', {
                ...formData,
                userId: loggedInUserId,
            });
            alert('Oferta dodana pomyślnie!');
        } catch (err) {
            alert('Błąd przy dodawaniu oferty');
            console.error(err);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Tutaj wpisz co oferujesz" onChange={handleChange} required/>
            <label htmlFor="category" className="form-label">Kategoria:</label>
            <select name="category" placeholder="Kategoria" onChange={handleChange} required>
                <option value="meal">Posiłek</option>
                <option value="fruits">Owoce</option>
                <option value="vegetables">Warzywa</option>
                <option value="drink">Napój</option>
            </select>
            <input name="price" type="number" placeholder="Cena za sztukę" min="0.01" step="0.01" onChange={handleChange} required/>
            <button type="submit">Dodaj ofertę</button>
        </form>
    );
}

export default OfferForm;