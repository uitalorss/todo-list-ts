import { IUser } from '../../../users/domain/models/IUser';
import { ICreateTaskDTO } from '../models/DTO/ICreateTaskDTO';
import { ITask } from '../models/ITask';

export interface ITaskRepository {
    create(data: ICreateTaskDTO): Promise<ITask>;
    findByUser(user: IUser): Promise<ITask[]>;
    findById(id: string): Promise<ITask | null>;
    save(task: ITask): Promise<ITask>;
    remove(task: ITask): Promise<void>;
}
