import mongoose, { Schema, model as createModel, Document } from 'mongoose';
import { UserLogin } from '../schemas';
import MongoModel from './MongoModel';

mongoose.pluralize(null);

interface UserLoginDocument extends UserLogin, Document {}

const userLoginSchema = new Schema<UserLoginDocument>({
  email: {
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
    protected model = createModel('login', userLoginSchema),
  ) {
    super(model);
  }

  readonly readOne = async (email: string) => 
    this.model.findOne({ email }, { _id: 0 });
}

export default LoginModel;
