import { IUser } from '../../../../Users/domain/models/IUser';

export interface ICreateTaskDTO {
    description: string;
    user: IUser;
}
