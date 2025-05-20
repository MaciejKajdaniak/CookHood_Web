import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', form);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Błąd logowania');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto',}}>
            <h2>Logowanie</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
            <input name="password" type="password" placeholder="Hasło" value={form.password} onChange={handleChange} required/>
            <button type="submit">Zaloguj</button>
        </form>
    );
};

export default LoginForm;
