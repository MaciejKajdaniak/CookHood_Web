import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('RegisterForm', () => {
    it('shows alert on success', async () => {
        axios.post.mockResolvedValueOnce({});
        window.alert = vi.fn();

        render(<RegisterForm />);

        fireEvent.change(screen.getByPlaceholderText(/imię/i), {
            target: { value: 'Test', name: 'name' }
        });
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@example.com', name: 'email' }
        });
        fireEvent.change(screen.getByPlaceholderText(/hasło/i), {
            target: { value: 'password123', name: 'password' }
        });

        fireEvent.click(screen.getByText(/zarejestruj/i));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Zarejestrowano pomyślnie!');
        });
    });

    it('shows alert on error', async () => {
        axios.post.mockRejectedValueOnce(new Error('Server error'));
        window.alert = vi.fn();

        render(<RegisterForm />);

        fireEvent.change(screen.getByPlaceholderText(/imię/i), {
            target: { value: 'Test', name: 'name' }
        });
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@example.com', name: 'email' }
        });
        fireEvent.change(screen.getByPlaceholderText(/hasło/i), {
            target: { value: 'password123', name: 'password' }
        });

        fireEvent.click(screen.getByText(/zarejestruj/i));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Błąd przy rejestracji');
        });
    });
});