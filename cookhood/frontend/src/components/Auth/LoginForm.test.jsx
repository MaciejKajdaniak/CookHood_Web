import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('LoginForm', () => {
    it('shows error if login fails', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Nieprawidłowy email lub hasło' } }
        });

        renderWithRouter(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@example.com', name: 'email' }
        });
        fireEvent.change(screen.getByPlaceholderText(/hasło/i), {
            target: { value: 'wrongpass', name: 'password' }
        });

        fireEvent.click(screen.getByText(/zaloguj/i));

        await waitFor(() => {
            expect(screen.getByText(/nieprawidłowy email lub hasło/i)).toBeInTheDocument();
        });
    });

    it('saves token and navigates on success', async () => {
        const token = 'test.token';
        const user = { id: 1, name: 'Test User', email: 'test@example.com' };

        axios.post.mockResolvedValueOnce({ data: { token, user } });
        Storage.prototype.setItem = jest.fn();

        renderWithRouter(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@example.com', name: 'email' }
        });
        fireEvent.change(screen.getByPlaceholderText(/hasło/i), {
            target: { value: 'password123', name: 'password' }
        });

        fireEvent.click(screen.getByText(/zaloguj/i));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
            expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
        });
    });
});