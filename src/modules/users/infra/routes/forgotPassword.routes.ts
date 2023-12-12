import { Router } from 'express';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

export const forgotPasswordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

forgotPasswordRoutes.post('/', forgotPasswordController.create);
