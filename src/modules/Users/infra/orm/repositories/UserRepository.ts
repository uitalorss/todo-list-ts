import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { dataSource } from '../../../../../infra/orm/dataSource';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IUser } from '../../../domain/models/IUser';
import { ICreateUserDTO } from '../../../domain/models/DTO/ICreateUserDTO';

export class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }
    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<IUser> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });

        await this.ormRepository.save(user);
        return user;
    }
    public async find(): Promise<IUser[]> {
        const users = await this.ormRepository.find();
        return users;
    }
    public async findById(id: string): Promise<IUser | null> {
        const user = await this.ormRepository.findOneBy({ id });
        return user;
    }
    public async findByEmail(email: string): Promise<IUser | null> {
        const user = await this.ormRepository.findOneBy({ email });
        return user;
    }
    public async save(user: IUser): Promise<IUser> {
        await this.ormRepository.save(user);
        return user;
    }
    public async remove(user: User): Promise<void> {
        await this.ormRepository.remove(user);
    }
}
