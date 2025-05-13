const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Brakuje danych' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email już istnieje' });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'buyer'
            },
        });
        res.status(201).json({ message: 'Utworzono użytkownika', userId: user.id });
    } catch (err) {
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

module.exports = { register };
