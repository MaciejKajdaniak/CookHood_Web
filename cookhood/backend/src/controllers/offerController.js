require('dotenv').config();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createOffer = async (req, res) => {
    const { title, category, price } = req.body;
    const userId = req.user.userId;
    const photoPath = req.file ? req.file.filename : null;
    console.log('req.user:', req.user);

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
        return res.status(400).json({ message: 'Użytkownik nie istnieje' });
    }

    if (!title || !category || !price) {
        return res.status(400).json({ message: 'Brakuje danych' });
    }

    try {
        const offer = await prisma.offer.create({
            data: {
                title,
                category,
                photo: photoPath,
                price: new Prisma.Decimal(price),
                user: { connect: { id: userId } },
            },
        });
        res.status(201).json({ message: 'Oferta dodana', offer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

const getOffers = async (req, res) => {
    try {
        const { category } = req.query;
        const whereClause = {};
        if (category && category.trim() !== '') {
            whereClause.category = category.trim();
        }
        const offers = await prisma.offer.findMany({ where: whereClause });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania ofert.', error: error.message });
    }
};

const getOfferById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const offer = await prisma.offer.findUnique({
            where: { id },
            include: { user: true }
        });
        if (!offer) return res.status(404).json({ message: 'Oferta nie znaleziona' });
        res.json(offer);
    } catch (err) {
        res.status(500).json({ message: 'Błąd pobierania oferty' });
    }
};

module.exports = { createOffer, getOffers, getOfferById };