import { IUser } from '../../../../users/domain/models/IUser';

export interface ICreateTaskDTO {
    description: string;
    user: IUser;
}

export interface IRequestCreateTaskDTO {
    description: string;
    user_id: string;
}
