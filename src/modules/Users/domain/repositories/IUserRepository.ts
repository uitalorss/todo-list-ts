import { IUser } from '../models/IUser';
import { ICreateUserDTO } from '../models/DTO/ICreateUserDTO';

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<IUser>;
    find(): Promise<IUser[]>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    save(user: IUser): Promise<IUser>;
    remove(user: IUser): Promise<void>;
}
