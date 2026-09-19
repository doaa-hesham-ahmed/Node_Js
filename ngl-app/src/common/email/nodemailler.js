import nodemailer from "nodemailer";
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
       // service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

export async function sendEmail(to, subject, html) {
    await transporter.sendMail({
        from: `"NGL-APP" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html
    });
}