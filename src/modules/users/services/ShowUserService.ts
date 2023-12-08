import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { NotFoundError } from '../../../shared/errors/ApiError';

@injectable()
export class ShowUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const { password: _, ...dataUser } = user;
        return dataUser;
    }
}
