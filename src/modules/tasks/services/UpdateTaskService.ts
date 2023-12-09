import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../domain/repositories/ITaskRepository';
import { NotFoundError } from '../../../shared/errors/ApiError';
import { IUpdateTaskDTO } from '../domain/models/DTO/IUpdateTaskDTO';

@injectable()
export class UpdateTaskService {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}
    public async execute({ id, description }: IUpdateTaskDTO) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError('Tarefa não encontrada.');
        }
        task.description = description;
        await this.taskRepository.save(task);
    }
}
