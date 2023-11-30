import { ICreateTaskDTO } from '../models/DTO/ICreateTaskDTO';
import { ITask } from '../models/ITask';

export interface ITaskRepository {
    create(data: ICreateTaskDTO): Promise<ITask>;
    find(): Promise<ITask[]>;
    findById(id: string): Promise<ITask | null>;
    save(task: ITask): Promise<ITask>;
    remove(task: ITask): Promise<void>;
}
