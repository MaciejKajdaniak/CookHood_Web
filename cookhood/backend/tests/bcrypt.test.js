const bcrypt = require('bcrypt');

describe('bcrypt password hashing', () => {
    const plainPassword = 'test123';

    test('should hash password correctly', async () => {
        const hashed = await bcrypt.hash(plainPassword, 10);
        expect(typeof hashed).toBe('string');
        expect(hashed).toMatch(/^\$2[aby]\$.{56}$/);
    });

    test('should compare hashed password successfully', async () => {
        const hashed = await bcrypt.hash(plainPassword, 10);
        const isMatch = await bcrypt.compare(plainPassword, hashed);
        expect(isMatch).toBe(true);
    });

    test('should fail to compare with wrong password', async () => {
        const hashed = await bcrypt.hash(plainPassword, 10);
        const isMatch = await bcrypt.compare('wrongpass', hashed);
        expect(isMatch).toBe(false);
    });
});