/* eslint-disable no-undef */
import nodemailer from 'nodemailer';

export const sendMail = async (options: { email: string; subject: string; message: string; to?: string }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    // todo Fix email sending for register and forgot password
    const mailOptions = {
        from: `Ceevee ${process.env.EMAIL_FROM}`,
        to: options.email,
        subject: options.subject,
        // text: options.message,
        html: options.message,
        // `<div>
        // <h1>Hi ${options.email || options.to},</h1>
        // <p>Reset you password, click the link</p>
        // <p>The link is only valid for 10 minutes</p>
        // <a href=${options.message}>Click Here</a>
        // </div>`,
    };
    await transporter.sendMail(mailOptions);
};

export default sendMail;
