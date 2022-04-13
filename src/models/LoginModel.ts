import mongoose, { Schema, model as createModel, Document } from 'mongoose';
import { UserLogin } from '../schemas';
import MongoModel from './MongoModel';

mongoose.pluralize(null);

interface UserLoginDocument extends UserLogin, Document {}

const userLoginSchema = new Schema<UserLoginDocument>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export class LoginModel extends MongoModel<UserLogin> {
  constructor(
    public model = createModel('login', userLoginSchema),
  ) {
    super(model);
  }
}

export default LoginModel;
