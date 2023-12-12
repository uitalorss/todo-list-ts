import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordEmailService } from '../../services/SendForgotPasswordEmailService';

export class ForgotPasswordController {
    public async create(req: Request, res: Response) {
        const { email } = req.body;
        const sendForgotPasswordEmail = container.resolve(
            SendForgotPasswordEmailService
        );
        await sendForgotPasswordEmail.execute({ email });
        return res.status(201).json({ message: 'Email enviado com sucesso.' });
    }
}
