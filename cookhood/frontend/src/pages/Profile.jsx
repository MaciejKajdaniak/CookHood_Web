import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar.jsx';

function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/');
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <h1>Twój profil</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        color: 'white',
                        border: 'none',
                        backgroundColor: 'red',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Wyloguj
                </button>
            </div>
        </div>
    );
}

export default Profile;
