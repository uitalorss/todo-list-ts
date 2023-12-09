import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import {
    BadRequestError,
    NotFoundError,
} from '../../../shared/errors/ApiError';
import { hash } from 'bcrypt';
import { UpdateUSerDTO } from '../domain/models/DTO/UserDTO';

@injectable()
export class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute(id: string, { name, email, password }: UpdateUSerDTO) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado.');
        }
        if (email) {
            const isEmailAlreadyExists =
                await this.userRepository.findByEmail(email);
            if (
                isEmailAlreadyExists &&
                isEmailAlreadyExists.email !== user.email
            ) {
                throw new BadRequestError(
                    'Esse email já está sendo usado por outra pessoa.'
                );
            }
            user.email = email;
        }
        if (name) {
            user.name = name;
        }

        if (password) {
            const hashedPassword = await hash(password, 10);
            user.password = hashedPassword;
        }

        await this.userRepository.save(user);
    }
}
