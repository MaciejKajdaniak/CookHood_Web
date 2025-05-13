import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', form);
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Błąd');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Rejestracja</h2>
            <input name="name" placeholder="Imię" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Hasło" onChange={handleChange} />
            <select name="role" onChange={handleChange}>
                <option value="buyer">Kupujący</option>
                <option value="seller">Sprzedawca</option>
            </select>
            <button type="submit">Zarejestruj</button>
            <p>{message}</p>
        </form>
    );
}
