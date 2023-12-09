import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../domain/repositories/ITaskRepository';
import { IDeleteTaskDTO } from '../domain/models/DTO/IDeleteTaskDTO';
import { NotFoundError } from '../../../shared/errors/ApiError';

@injectable()
export class DeleteTaskService {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}
    public async execute({ id }: IDeleteTaskDTO) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError('Tarefa não encontrada.');
        }
        await this.taskRepository.remove(task);
    }
}
