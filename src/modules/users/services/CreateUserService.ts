import { hash } from 'bcrypt';
import { BadRequestError } from '../../../shared/errors/ApiError';
import { CreateUserDTO } from '../domain/models/DTO/UserDTO';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ name, email, password }: CreateUserDTO) {
        const isValidEmail = await this.userRepository.findByEmail(email);
        if (isValidEmail) {
            throw new BadRequestError('Email já cadastrado na apliação');
        }

        const hashedPassword = await hash(password, 10);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}
