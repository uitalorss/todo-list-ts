import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { ResetPasswordDTO } from '../domain/models/DTO/ResetPasswordDTO';
import {
    BadRequestError,
    NotFoundError,
} from '../../../shared/errors/ApiError';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcrypt';

@injectable()
export class ResetPasswordService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository
    ) {}
    public async execute({ token, password }: ResetPasswordDTO) {
        const userToken = await this.userTokenRepository.findByToken(token);
        if (!userToken) {
            throw new NotFoundError('Token não encontrado.');
        }
        const user = await this.userRepository.findById(userToken.user_id);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        const compareDate = addHours(userToken.created_at, 2);
        if (isAfter(Date.now(), compareDate)) {
            throw new BadRequestError('Token expirado.');
        }
        const hashedPassword = await hash(password, 8);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }
}
