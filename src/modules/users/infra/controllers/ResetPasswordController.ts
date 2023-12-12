import { Request, Response } from 'express';
import { ResetPasswordService } from '../../services/ResetPasswordService';
import { container } from 'tsyringe';
import { BadRequestError } from '../../../../shared/errors/ApiError';

export class ResetPasswordController {
    public async reset(req: Request, res: Response) {
        const { token } = req.query;
        const { password } = req.body;
        if (typeof token !== 'string') {
            throw new BadRequestError('Favor informar um token válido');
        }
        const resetPassword = container.resolve(ResetPasswordService);
        await resetPassword.execute({ token, password });
        return res.status(204).send();
    }
}
