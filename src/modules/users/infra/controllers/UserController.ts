import { Request, Response } from 'express';
import { CreateUserService } from '../../services/CreateUserService';
import { container } from 'tsyringe';
import { ShowUserService } from '../../services/ShowUserService';

export class UserController {
    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const createUser = container.resolve(CreateUserService);
        await createUser.execute({ name, email, password });

        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        const showUser = container.resolve(ShowUserService);
        const user = await showUser.execute(id);
        return res.status(200).json(user);
    }
}
