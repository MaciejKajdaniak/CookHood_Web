const bcrypt = require('bcrypt');
const jwt = require("../utils/jwt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Brakuje danych' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email już istnieje' });

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: password,
                role: role || 'buyer'
            },
        });
        res.status(201).json({ message: 'Utworzono użytkownika', userId: user.id });
    } catch (err) {
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

//module.exports = { register };

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Nieprawidłowy email lub hasło" });
        }

        if (password != user.password) {
            return res.status(401).json({ message: "Nieprawidłowy email lub hasło" });
        }

        const token = jwt.generateToken(user.id);

        res.status(200).json({
            message: "Zalogowano pomyślnie",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("Błąd logowania:", error);
        res.status(500).json({ message: "Wewnętrzny błąd serwera" });
    }
};


