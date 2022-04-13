import { string, z } from 'zod';
import { stringSchema } from '../utils/createSchema';

export const UserLoginSchema = z.object({
  username: string().optional(),
  email: stringSchema('Email', 3, 50).email(),
  password: stringSchema('Password', 3, 30),
});

type UserLogin = z.infer<typeof UserLoginSchema>;

export default UserLogin;
