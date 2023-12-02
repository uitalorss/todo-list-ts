import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);
