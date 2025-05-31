import { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [frm, setFrm] = useState({ name: '', email: '', password: '', role: 'buyer' });

    const handleCh = (e) => {
        setFrm({ ...frm, [e.target.name]: e.target.value });
    };

    const handleSub = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/register', frm);
            alert('Zarejestrowano pomyślnie!');
        } catch (err) {
            alert('Błąd przy rejestracji');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSub} style={s.frm}>
            <h2 style={s.ttl}>Rejestracja</h2>
            <input name="name" placeholder="Imię" onChange={handleCh} style={s.inp} required />
            <input name="email" type="email" placeholder="Email" onChange={handleCh} style={s.inp} required />
            <input name="password" type="password" placeholder="Hasło" onChange={handleCh} style={s.inp} required />
            <select name="role" onChange={handleCh} style={s.sel}>
                <option value="buyer">Kupujący</option>
                <option value="seller">Sprzedawca</option>
            </select>
            <button type="submit" style={s.btn}>Zarejestruj</button>
        </form>
    );
}

export default RegisterForm;

const s = {
    frm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '320px',
        margin: '3rem auto',
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: '#f0fff5',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
    },
    ttl: {
        textAlign: 'center',
        color: '#388e3c'
    },
    inp: {
        padding: '0.8rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem'
    },
    sel: {
        padding: '0.8rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem'
    },
    btn: {
        backgroundColor: '#66bb6a',
        color: 'white',
        border: 'none',
        padding: '0.8rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem'
    }
};
