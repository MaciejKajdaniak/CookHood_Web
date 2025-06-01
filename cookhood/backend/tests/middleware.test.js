const jwt = require('jsonwebtoken');
const authenticate = require('../src/middleware/authMiddleware');

describe('authenticate middleware', () => {
    const mockReq = (token) => ({
        headers: {
            authorization: token ? `Bearer ${token}` : undefined
        }
    });

    const mockRes = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeAll(() => {
        process.env.JWT_SECRET = 'testsecret';
    });

    it('returns 401 if no token provided', () => {
        const req = mockReq(null);
        const res = mockRes();
        const next = jest.fn();

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Brak tokenu' });
        expect(next).not.toHaveBeenCalled();
    });

    it('returns 403 if token is invalid', () => {
        const req = mockReq('invalid.token.value');
        const res = mockRes();
        const next = jest.fn();

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nieprawidłowy token' });
        expect(next).not.toHaveBeenCalled();
    });

    it('calls next() if token is valid', () => {
        const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET);
        const req = mockReq(token);
        const res = mockRes();
        const next = jest.fn();

        authenticate(req, res, next);

        expect(req.user).toBeDefined();
        expect(req.user.userId).toBe(123);
        expect(next).toHaveBeenCalled();
    });
});