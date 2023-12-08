import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSessionService } from '../../services/CreateSessionService';

export class SessionController {
    public async create(req: Request, res: Response) {
        const { email, password } = req.body;
        const createSession = container.resolve(CreateSessionService);
        const login = await createSession.execute({ email, password });
        return res.status(200).json(login);
    }
}
