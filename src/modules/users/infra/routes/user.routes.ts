import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { UserSchema, partialUserSchema } from '../../domain/schemas/UserSchema';
import { handleAuthentication } from '../../../../shared/infra/middlewares/handleAuthentication';
import { UserController } from '../controllers/UserController';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', validateRequest(UserSchema), userController.create);

userRoutes.use(handleAuthentication);
userRoutes.get('/', userController.show);
userRoutes.put('/', validateRequest(partialUserSchema), userController.update);
