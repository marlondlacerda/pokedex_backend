import { z } from 'zod';
import { stringSchema } from '../utils/createSchema';

const userSchema = z.object({
  username: stringSchema('Username', 3, 10),
  password: stringSchema('Password', 3, 10),
});

type UserLogin = z.infer<typeof userSchema>;

export default UserLogin;
export { userSchema };
