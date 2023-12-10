import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { handleAuthentication } from '../../../../shared/infra/middlewares/handleAuthentication';

export const taskController = new TaskController();
export const taskRoutes = Router();

taskRoutes.use(handleAuthentication);
taskRoutes.post('/', taskController.create);
taskRoutes.get('/', taskController.list);
taskRoutes.put('/:id', taskController.update);
taskRoutes.patch('/:id', taskController.patch);
taskRoutes.delete('/:id', taskController.delete);
