const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

describe('Offers API', () => {
    let token;
    let userId;

    beforeAll(async () => {
        await prisma.offer.deleteMany();
        await prisma.user.deleteMany();

        const user = await prisma.user.create({
            data: {
                email: 'test@example.com',
                password: 'hashedpassword',
                name: "Test User"
            },
        });

        userId = user.id;
        token = jwt.sign({ userId }, process.env.JWT_SECRET || 'testsecret');
    });

    afterAll(async () => {
        await prisma.offer.deleteMany();
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    test('Should create an offer when authenticated', async () => {
        const res = await request(app)
            .post('/api/offers/create-offer')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Test offer')
            .field('category', 'Test category')
            .field('description', 'Some description')
            .field('price', '12.50');

        expect(res.statusCode).toBe(201);
        expect(res.body.offer).toHaveProperty('id');
        expect(res.body.offer.title).toBe('Test offer');
    });
});