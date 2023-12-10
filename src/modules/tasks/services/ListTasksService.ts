import { inject, injectable } from 'tsyringe';
import { IListUsersTask } from '../domain/models/DTO/IListUsersTask';
import { IUserRepository } from '../../users/domain/repositories/IUserRepository';
import { NotFoundError } from '../../../shared/errors/ApiError';

@injectable()
export class ListTasksService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}
    public async execute({ user_id }: IListUsersTask) {
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        return user.tasks;
    }
}
