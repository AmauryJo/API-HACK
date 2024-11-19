import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function mailer(content, subject, quantity, target){

    if (!quantity){
        return res.status(400).json({ error: 'La quantité est requise' });
    }
    if (!target){
        return res.status(400).json({ error: 'La cible est requise' });
    }
    if (!content){
        return res.status(400).json({ error: 'La cible est requise' });
    }
    if (!subject){
        return res.status(400).json({ error: 'Le sujet est requis' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.mailsender,
            pass: process.env.gmailpwd
        }
    });
    for (let i = 0; i < quantity; i++){
        await sendMail(target, i);
    }

    async function sendMail(target, i){
        const mailOptions = {
            from: process.env.mailsender,
            to: target,
            subject: subject,
            text: `${content} numéro ${i + 1}`
        };

        await transporter.sendMail(mailOptions);
    }
}
