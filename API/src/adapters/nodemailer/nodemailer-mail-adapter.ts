import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "36cf524a29ed05",
        pass: "ff8c4151b46f2f"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'suport@feedget.com',
            to: 'nathannss14@gmail.com',
            subject,
            html: body
        })
    }
}