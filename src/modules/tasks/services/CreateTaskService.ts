import { inject, injectable } from 'tsyringe';
import { IRequestCreateTaskDTO } from '../domain/models/DTO/ICreateTaskDTO';
import { IUserRepository } from '../../users/domain/repositories/IUserRepository';
import { ITaskRepository } from '../domain/repositories/ITaskRepository';
import { NotFoundError } from '../../../shared/errors/ApiError';

@injectable()
export class CreateTaskService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    public async execute({ user_id, description }: IRequestCreateTaskDTO) {
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        await this.taskRepository.create({ description, user });
    }
}
