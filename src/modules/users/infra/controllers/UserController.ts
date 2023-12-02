import { Request, Response } from 'express';
import { CreateUserService } from '../../services/CreateUserService';
import { container } from 'tsyringe';

export class UserController {
    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const createUser = container.resolve(CreateUserService);
        await createUser.execute({ name, email, password });

        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }
}
