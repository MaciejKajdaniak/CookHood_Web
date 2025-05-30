const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const contactSeller = async (req, res) => {
    const { offerId, sellerId, message, buyerEmail, buyerName } = req.body;

    try {
        const seller = await prisma.user.findUnique({
            where: { id: sellerId }
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"CookHood" <${process.env.EMAIL_USER}>`,
            to: seller.email,
            subject: `Nowa wiadomość dotycząca oferty #${offerId}`,
            html: `
                <h2>Nowa wiadomość od ${buyerName} (${buyerEmail})</h2>
                <p>Oferta: #${offerId}</p>
                <p>Wiadomość:</p>
                <p>${message}</p>
                <p>---</p>
                <p>To jest automatyczna wiadomość, prosimy nie odpowiadać.</p>
            `
        });

        res.status(200).json({ message: 'Wiadomość wysłana pomyślnie' });
    } catch (error) {
        console.error('Błąd przy wysyłaniu wiadomości:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas wysyłania wiadomości' });
    }
};

module.exports = { contactSeller };