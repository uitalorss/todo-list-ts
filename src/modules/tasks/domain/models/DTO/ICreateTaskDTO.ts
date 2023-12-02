import { IUser } from '../../../../users/domain/models/IUser';

export interface ICreateTaskDTO {
    description: string;
    user: IUser;
}
