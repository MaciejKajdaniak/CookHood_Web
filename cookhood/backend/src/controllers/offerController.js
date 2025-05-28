const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createOffer = async (req, res) => {
    const { title, category, price } = req.body;
    const userId = req.user.userId;
    const photoPath = req.file ? req.file.filename : null;

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
        console.log('req.query:', req.query)
        const { category } = req.query;
        console.log('Requested category:', category);

        const offers = await prisma.offer.findMany({
            where: category ? { category } : {},
        });

        res.json(offers);
    } catch (error) {
        console.error('Błąd podczas pobierania ofert:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania ofert.' });
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