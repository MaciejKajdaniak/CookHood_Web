const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let testUser;
let token;

beforeAll(async () => {
    testUser = await prisma.user.create({
        data: {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'hashedpassword',
            role: 'seller'
        }
    });

    token = jwt.sign({ userId: testUser.id }, process.env.JWT_SECRET || 'testsecret');
});

afterAll(async () => {
    await prisma.favorite.deleteMany();
    await prisma.offer.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
});

describe('Offers API', () => {
    test('Should create an offer when authenticated', async () => {
        const res = await request(app)
            .post('/api/offers/create-offer')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Test offer')
            .field('category', 'Test category')
            .field('price', '12.50');

        expect(res.statusCode).toBe(201);
        expect(res.body.offer).toHaveProperty('id');
        expect(res.body.offer.title).toBe('Test offer');
    });
});