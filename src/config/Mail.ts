import { createTransport } from 'nodemailer';
import { SendMailDTO } from '../modules/users/domain/models/DTO/SendMailDTO';
import { HtmlCompiler } from './HtmlCompiler';

const htmlCompiler = new HtmlCompiler();

export class Mail {
    static async sendMail({ email, subject, template }: SendMailDTO) {
        const transport = createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        transport.sendMail({
            from: `${process.env.MAIL_FROM} <${process.env.MAIL_FROM}>`,
            to: email,
            subject,
            html: await htmlCompiler.parse(template),
        });
    }
}
