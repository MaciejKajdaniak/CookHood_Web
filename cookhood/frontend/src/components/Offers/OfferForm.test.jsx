import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OfferForm from './OfferForm';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = vi.fn();
});

beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
});

beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
    window.alert.mockRestore();
});

afterAll(() => {
    global.URL.createObjectURL.mockRestore?.();
});

test('shows alert on success', async () => {
    axios.post.mockResolvedValueOnce({});
    render(<OfferForm />);

    fireEvent.change(screen.getByLabelText(/tytuł/i), { target: { value: 'Jabłka', name: 'title' } });
    fireEvent.change(screen.getByLabelText(/kategoria/i), { target: { value: 'fruits', name: 'category' } });
    fireEvent.change(screen.getByLabelText(/zdjęcie/i), {
        target: {
            files: [new File(['test'], 'photo.png', { type: 'image/png' })],
            name: 'photo'
        }
    });
    fireEvent.change(screen.getByLabelText(/cena/i), { target: { value: '5.00', name: 'price' } });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Oferta dodana pomyślnie!');
    });
});

test('shows alert on error', async () => {
    axios.post.mockRejectedValueOnce(new Error('API error'));
    render(<OfferForm />);

    fireEvent.change(screen.getByLabelText(/tytuł/i), { target: { value: 'Jabłka', name: 'title' } });
    fireEvent.change(screen.getByLabelText(/kategoria/i), { target: { value: 'fruits', name: 'category' } });
    fireEvent.change(screen.getByLabelText(/zdjęcie/i), {
        target: {
            files: [new File(['test'], 'photo.png', { type: 'image/png' })],
            name: 'photo'
        }
    });
    fireEvent.change(screen.getByLabelText(/cena/i), { target: { value: '5.00', name: 'price' } });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Błąd przy dodawaniu oferty');
    });
});