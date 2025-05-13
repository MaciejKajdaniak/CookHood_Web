import { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/register', formData);
            alert('Zarejestrowano pomyślnie!');
        } catch (err) {
            alert('Błąd przy rejestracji');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Imię" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Hasło" onChange={handleChange} required />
            <select name="role" onChange={handleChange}>
                <option value="buyer">Kupujący</option>
                <option value="seller">Sprzedawca</option>
            </select>
            <button type="submit">Zarejestruj</button>
        </form>
    );
}

export default RegisterForm;
