import { z } from 'zod';

export const UserSchema = z.object({
    name: z
        .string({
            required_error: 'Campo Nome é obrigatório',
        })
        .trim()
        .min(1, 'Campo Nome não pode ficar vazio'),
    email: z
        .string({ required_error: 'Campo email é obrigatório' })
        .email('Favor informar um email válido'),
    password: z
        .string({ required_error: 'Campo senha é obrigatório' })
        .min(5, 'Favor informar uma senha maior')
        .max(20, 'favor informar uma senha menor'),
});
