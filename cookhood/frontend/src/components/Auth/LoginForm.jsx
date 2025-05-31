import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [err, setErr] = useState('');
    const nav = useNavigate();

    const handleCh = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSub = async (e) => {
        e.preventDefault();
        setErr('');

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            nav('/');
        } catch (err) {
            console.error(err);
            setErr(err.response?.data?.message || 'Błąd logowania');
        }
    };

    return (
        <form onSubmit={handleSub} style={s.frm}>
            <h2 style={s.ttl}>Logowanie</h2>
            {err && <p style={s.err}>{err}</p>}
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleCh} style={s.inp} required />
            <input name="password" type="password" placeholder="Hasło" value={form.password} onChange={handleCh} style={s.inp} required />
            <button type="submit" style={s.btn}>Zaloguj</button>
        </form>
    );
};

export default LoginForm;

const s = {
    frm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '320px',
        margin: '3rem auto',
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: '#eafaf1',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
    },
    ttl: {
        textAlign: 'center',
        color: '#2e7d32'
    },
    err: {
        color: 'red',
        textAlign: 'center'
    },
    inp: {
        padding: '0.8rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem'
    },
    btn: {
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        padding: '0.8rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem'
    }
};
