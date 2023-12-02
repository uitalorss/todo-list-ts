import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/Users/domain/repositories/IUserRepository';
import { UserRepository } from '../../modules/Users/infra/orm/repositories/UserRepository';
import { ITaskRepository } from '../../modules/Tasks/domain/repositories/ITaskRepository';
import { TaskRepository } from '../../modules/Tasks/infra/orm/repositories/TaskRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
