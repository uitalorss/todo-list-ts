import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { SendForgotPasswordEmailDTO } from '../domain/models/DTO/ChangePasswordDTO';
import { NotFoundError } from '../../../shared/errors/ApiError';
import { Mail } from '../../../config/Mail';
import path from 'path';

const mailTemplate = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'templates',
    'ResetPassword.hbs'
);

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
        await Mail.sendMail({
            email: user.email,
            subject: 'Redefinição de senha',
            template: {
                template: mailTemplate,
                variables: {
                    name: user.name,
                    token: userToken.token,
                },
            },
        });
    }
}
