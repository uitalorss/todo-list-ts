import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/users/domain/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/infra/orm/repositories/UserRepository';
import { ITaskRepository } from '../../modules/tasks/domain/repositories/ITaskRepository';
import { TaskRepository } from '../../modules/tasks/infra/orm/repositories/TaskRepository';
import { IUserTokenRepository } from '../../modules/users/domain/repositories/IUserTokenRepository';
import { UserTokenRepository } from '../../modules/users/infra/orm/repositories/UserTokenRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository
);
