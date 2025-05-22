const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createOffer = async (req, res) => {
    const { title, category, price } = req.body;
    const userId = req.user.userId;

    if (!title || !category || !price) {
        return res.status(400).json({ message: 'Brakuje danych' });
    }

    try {
        const offer = await prisma.offer.create({
            data: {
                title,
                category,
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

module.exports = { createOffer };