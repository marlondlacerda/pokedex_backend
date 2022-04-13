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

export class UserLoginModel extends MongoModel<UserLogin> {
  constructor(
    public model = createModel('pokedex', userLoginSchema),
  ) {
    super(model);
  }
}

export default UserLoginModel;
