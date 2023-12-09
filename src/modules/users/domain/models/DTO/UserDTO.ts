import { z } from 'zod';
import { UserSchema, partialUserSchema } from '../../schemas/UserSchema';

export type CreateUserDTO = z.infer<typeof UserSchema>;
export type UpdateUSerDTO = z.infer<typeof partialUserSchema>;
