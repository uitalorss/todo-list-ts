import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { ISessionDTO } from '../domain/models/DTO/ISessionDTO';
import { BadRequestError } from '../../../shared/errors/ApiError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@injectable()
export class CreateSessionService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}
    public async execute({ email, password }: ISessionDTO) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new BadRequestError('Usuário e/ou senha inválidos.');
        }
        const validatePassword = await compare(password, user.password);
        if (!validatePassword) {
            throw new BadRequestError('Usuário e/ou senha inválidos.');
        }
        const token = sign({}, 'todolistapi', {
            subject: user.id,
            expiresIn: '8h',
        });

        return {
            user,
            token,
        };
    }
}
