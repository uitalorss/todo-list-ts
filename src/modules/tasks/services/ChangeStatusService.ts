import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../domain/repositories/ITaskRepository';
import { IUpdateStatusDTO } from '../domain/models/DTO/IUpdateTaskDTO';
import { NotFoundError } from '../../../shared/errors/ApiError';

@injectable()
export class ChangeStatusService {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}
    public async execute({ id }: IUpdateStatusDTO) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError('Tarefa não encontrada.');
        }
        task.completed = !task.completed;
        await this.taskRepository.save(task);
        return task;
    }
}
