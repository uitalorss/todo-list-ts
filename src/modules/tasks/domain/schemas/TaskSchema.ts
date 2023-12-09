import { z } from 'zod';

export const TaskSchema = z.object({
    description: z
        .string({ required_error: 'Campo Nome é obrigatório' })
        .trim()
        .min(1, 'O campo não pode ficar vazio.'),
});
