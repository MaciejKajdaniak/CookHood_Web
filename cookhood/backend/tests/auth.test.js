const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Auth API', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.favorite.deleteMany();
        await prisma.offer.deleteMany();
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    test('Should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'newuser@test.com',
                password: 'test123',
                name: 'Nowy Użytkownik',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toMatch(/Utworzono użytkownika/i);
    });

    test('Should login with correct credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'newuser@test.com',
                password: 'test123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('Should not login with incorrect password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'newuser@test.com',
                password: 'wrongpass',
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toMatch(/Nieprawidłowy email lub hasło/i);
    });

    test('Should return 400 if email is missing on register', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test', password: 'test123' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/Brakuje danych/i);
    });
});