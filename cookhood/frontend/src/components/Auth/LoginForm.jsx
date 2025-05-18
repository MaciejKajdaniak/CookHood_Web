import React, { useState } from 'react';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logowanie:', form);
        // Tutaj będzie request do backendu przez axios
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
            <h2>Logowanie</h2>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Hasło" value={form.password} onChange={handleChange} required />
            <button type="submit">Zaloguj</button>
        </form>
    );
};

export default LoginForm;
