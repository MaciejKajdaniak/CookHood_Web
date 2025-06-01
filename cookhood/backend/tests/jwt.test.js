const { generateToken } = require('../src/utils/jwt');
const jwt = require('jsonwebtoken');

describe('generateToken', () => {
    const userId = 'abc123';
    const secret = 'testsecret';

    beforeAll(() => {
        process.env.JWT_SECRET = secret;
    });

    test('should return a valid JWT token', () => {
        const token = generateToken(userId);
        expect(typeof token).toBe('string');

        const decoded = jwt.verify(token, secret);
        expect(decoded).toHaveProperty('userId', userId);
    });

    test('should expire in 7 days', () => {
        const token = generateToken(userId);
        const decoded = jwt.verify(token, secret);

        const now = Math.floor(Date.now() / 1000);
        const diffInDays = Math.floor((decoded.exp - now) / (60 * 60 * 24));

        expect(diffInDays).toBeLessThanOrEqual(7);
    });
});