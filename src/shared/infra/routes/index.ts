import { Router } from 'express';
import { userRoutes } from '../../../modules/users/infra/routes/user.routes';
import { sessionRoutes } from '../../../modules/users/infra/routes/session.routes';
import { taskRoutes } from '../../../modules/tasks/infra/routes/task.routes';
import { passwordRoutes } from '../../../modules/users/infra/routes/password.routes';

export const router = Router();

router.use('/user', userRoutes);
router.use('/login', sessionRoutes);
router.use('/task', taskRoutes);
router.use('/password', passwordRoutes);
