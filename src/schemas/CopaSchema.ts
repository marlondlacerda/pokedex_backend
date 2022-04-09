import mongoose from 'mongoose';
import { ICopa } from '../interfaces';

const CopaSchema = new mongoose.Schema<ICopa>();

export default CopaSchema;
