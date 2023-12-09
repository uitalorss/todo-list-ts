import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateRequest } from '../middlewares/validateRequest';
import { UserSchema } from '../../domain/schemas/UserSchema';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', validateRequest(UserSchema), userController.create);
userRoutes.get('/:id', userController.show);
userRoutes.put('/:id', userController.update);
