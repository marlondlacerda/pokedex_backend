import { z } from 'zod';
import { stringSchema } from '../utils/createSchema';

export const UserLoginSchema = z.object({
  email: stringSchema('Email', 3, 50).email(),
  password: stringSchema('Password', 3, 10),
});

type UserLogin = z.infer<typeof UserLoginSchema>;

export default UserLogin;
