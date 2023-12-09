import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../domain/repositories/ITaskRepository';
import { IListUsersTask } from '../domain/models/DTO/IListUsersTask';
import { IUserRepository } from '../../users/domain/repositories/IUserRepository';
import { NotFoundError } from '../../../shared/errors/ApiError';

@injectable()
export class ListTasksService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}
    public async execute({ user_id }: IListUsersTask) {
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const tasks = await this.taskRepository.findByUser(user);
        return tasks;
    }
}
