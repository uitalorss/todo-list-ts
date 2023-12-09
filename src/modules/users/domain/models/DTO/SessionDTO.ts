import { User } from '../../../infra/orm/entities/User';

export type SessionDTO = {
    email: string;
    password: string;
};

export type RequestSessionDTO = {
    user: User;
    token: string;
};
