import { z } from 'zod';
import { UserSchema } from '../../schemas/UserSchema';

export type ICreateUserDTO = z.infer<typeof UserSchema>;
