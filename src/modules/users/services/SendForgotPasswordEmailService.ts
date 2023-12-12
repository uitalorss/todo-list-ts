import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { SendForgotPasswordEmailDTO } from '../domain/models/DTO/ChangePasswordDTO';
import { NotFoundError } from '../../../shared/errors/ApiError';
import { transport } from '../../../config/Mail';

@injectable()
export class SendForgotPasswordEmailService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository
    ) {}
    public async execute({ email }: SendForgotPasswordEmailDTO) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const userToken = await this.userTokenRepository.generateToken(user.id);

        transport.sendMail({
            from: `${process.env.MAIL_FROM} <${process.env.MAIL_FROM}>`,
            to: user.email,
            subject: 'Redefina sua senha',
            text: userToken.token,
        });
    }
}
