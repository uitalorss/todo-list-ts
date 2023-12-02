import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/users/domain/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/infra/orm/repositories/UserRepository';
import { ITaskRepository } from '../../modules/tasks/domain/repositories/ITaskRepository';
import { TaskRepository } from '../../modules/tasks/infra/orm/repositories/TaskRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
