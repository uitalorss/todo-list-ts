import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { CreateUserService } from '../../services/CreateUserService';
import { ShowUserService } from '../../services/ShowUserService';
import { UpdateUserService } from '../../services/UpdateUserService';

export class UserController {
    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const createUser = container.resolve(CreateUserService);
        await createUser.execute({ name, email, password });

        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }

    public async show(req: Request, res: Response) {
        const { id } = req.user;
        const showUser = container.resolve(ShowUserService);
        const user = await showUser.execute(id);
        return res.status(200).json(instanceToInstance(user));
    }

    public async update(req: Request, res: Response) {
        const { id } = req.user;
        const { name, email, password } = req.body;
        const updateUser = container.resolve(UpdateUserService);
        await updateUser.execute(id, { name, email, password });
        return res.status(204).send();
    }
}
