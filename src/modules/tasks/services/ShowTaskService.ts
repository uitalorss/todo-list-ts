import { inject, injectable } from 'tsyringe';
import { TaskRepository } from '../infra/orm/repositories/TaskRepository';
import { IShowTaskRequestDTO } from '../domain/models/DTO/IShowTaskRequestDTO';
import { NotFoundError } from '../../../shared/errors/ApiError';

@injectable()
export class showTaskService {
    constructor(
        @inject('TaskRepository')
        private taskRepository: TaskRepository
    ) {}

    public async execute({ id }: IShowTaskRequestDTO) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError('Tarefa não encontrada');
        }
        return task;
    }
}
