import { ITask } from '../../../Tasks/domain/models/ITask';

export interface IUser {
    id: string;
    name: string;
    email: string;
    tasks?: ITask[];
    password: string;
    created_at: Date;
    updated_at: Date;
}
