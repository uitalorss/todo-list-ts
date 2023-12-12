import { IUserToken } from '../models/IUserToken';

export interface IUserTokenRepository {
    generateToken(user_id: string): Promise<IUserToken>;
    findByToken(token: string): Promise<IUserToken | null>;
}
