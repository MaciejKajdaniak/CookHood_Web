const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const path = require('path');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let token;

describe('Offers API', () => {
    beforeAll(async () => {
        await prisma.favorite.deleteMany();
        await prisma.offer.deleteMany();
        await prisma.user.deleteMany();

        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'offeruser@test.com',
                password: 'test123',
                name: 'Oferta Tester'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'offeruser@test.com',
                password: 'test123'
            });

        token = res.body.token;
    });

    afterAll(async () => {
        await prisma.favorite.deleteMany();
        await prisma.offer.deleteMany();
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    test('Should create an offer when authenticated', async () => {
        const res = await request(app)
            .post('/api/offers/create-offer')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Test offer')
            .field('category', 'meal')
            .field('price', '12.50')
            .attach('photo', path.join(__dirname, 'assets/test-image.jpg'));

        expect(res.statusCode).toBe(201);
        expect(res.body.offer).toHaveProperty('id');
        expect(res.body.offer.title).toBe('Test offer');
    });
});