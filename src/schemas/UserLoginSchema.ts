import { z } from 'zod';
import { stringSchema } from '../utils/createSchema';

const UserLoginSchema = z.object({
  username: stringSchema('Username', 3, 10),
  password: stringSchema('Password', 3, 10),
});

type UserLogin = z.infer<typeof UserLoginSchema>;

export default UserLogin;
export { UserLoginSchema };
