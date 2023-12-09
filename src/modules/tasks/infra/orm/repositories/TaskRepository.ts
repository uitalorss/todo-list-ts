import { Repository } from 'typeorm';
import { ICreateTaskDTO } from '../../../domain/models/DTO/ICreateTaskDTO';
import { ITask } from '../../../domain/models/ITask';
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import { Task } from '../entities/Task';
import { dataSource } from '../../../../../shared/infra/orm/dataSource';
import { IUser } from '../../../../users/domain/models/IUser';

export class TaskRepository implements ITaskRepository {
    private ormRepository: Repository<Task>;
    constructor() {
        this.ormRepository = dataSource.getRepository(Task);
    }
    public async create({ description, user }: ICreateTaskDTO): Promise<ITask> {
        const task = this.ormRepository.create({
            description,
            user,
        });
        await this.ormRepository.save(task);
        return task;
    }

    public async findById(id: string): Promise<ITask | null> {
        const task = this.ormRepository.findOneBy({ id });
        return task;
    }

    public async findByUser(user: IUser): Promise<ITask[]> {
        const tasks = this.ormRepository.find({
            where: {
                user,
            },
        });
        return tasks;
    }

    public async save(task: ITask): Promise<ITask> {
        await this.ormRepository.save(task);
        return task;
    }
    public async remove(task: Task): Promise<void> {
        await this.ormRepository.remove(task);
    }
}
