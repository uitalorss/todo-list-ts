import { Router } from 'express';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/ResetPasswordController';

export const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', forgotPasswordController.create);
passwordRoutes.patch('/reset', resetPasswordController.reset);
