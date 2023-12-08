import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUpdateUserDTO } from '../domain/models/DTO/IUpdateUserDTO';
import {
    BadRequestError,
    NotFoundError,
} from '../../../shared/errors/ApiError';
import { compare, hash } from 'bcrypt';

@injectable()
export class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({
        id,
        name,
        email,
        newPassword,
        oldPassword,
    }: IUpdateUserDTO) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado.');
        }
        const isEmailAlreadyExists =
            await this.userRepository.findByEmail(email);
        if (isEmailAlreadyExists && isEmailAlreadyExists.email !== user.email) {
            throw new BadRequestError(
                'Esse email já está sendo usado por outra pessoa.'
            );
        }
        if (newPassword) {
            if (!oldPassword) {
                throw new BadRequestError('Favor informar a senha atual.');
            }
            const validatePassword = await compare(oldPassword, user.password);
            if (!validatePassword) {
                throw new BadRequestError('Erro ao atualizar usuário');
            }
            const hashedPassword = await hash(newPassword, 10);
            user.password = hashedPassword;
        }
        user.name = name;
        user.email = email;
        await this.userRepository.save(user);
    }
}
