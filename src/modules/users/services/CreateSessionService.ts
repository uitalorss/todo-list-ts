import dotenv from 'dotenv';
dotenv.config();
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
        if (!process.env.JWT_KEY) {
            throw new BadRequestError('Erro na validação da sessão');
        }
        const token = sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: '8h',
        });

        return {
            user,
            token,
        };
    }
}
