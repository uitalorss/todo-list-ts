import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTaskService } from '../../services/CreateTaskService';
import { ListTasksService } from '../../services/ListTasksService';
import { UpdateTaskService } from '../../services/UpdateTaskService';
import { DeleteTaskService } from '../../services/DeleteTaskService';
import { ChangeStatusService } from '../../services/ChangeStatusService';

export class TaskController {
    public async create(req: Request, res: Response) {
        const createUser = container.resolve(CreateTaskService);
        const { description } = req.body;
        const { id } = req.user;

        await createUser.execute({ user_id: id, description });
        return res.status(201).json({ message: 'Tarefa criada com sucesso.' });
    }

    public async list(req: Request, res: Response) {
        const listTasks = container.resolve(ListTasksService);
        const { id } = req.user;

        const tasks = await listTasks.execute({ user_id: id });
        return res.status(200).json(tasks);
    }

    public async update(req: Request, res: Response) {
        const updateTask = container.resolve(UpdateTaskService);
        const { id } = req.params;
        const { description } = req.body;

        await updateTask.execute({ id, description });
        return res.status(204).send();
    }

    public async delete(req: Request, res: Response) {
        const deleteTask = container.resolve(DeleteTaskService);
        const { id } = req.params;

        await deleteTask.execute({ id });
        return res.status(204).send();
    }

    public async patch(req: Request, res: Response) {
        const changeStatus = container.resolve(ChangeStatusService);
        const { id } = req.params;

        const task = await changeStatus.execute({ id });
        return res.status(200).json(task);
    }
}
