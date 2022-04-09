import mongoose from 'mongoose';

require('dotenv/config');

const options = {
  autoIndex: false,
  dbName: process.env.MONGO_DB_NAME,
};

const Connection = (
  mongoDatabaseURI = process.env.MONGO_URI
    || 'mongodb://localhost:27017/',
) => mongoose.connect(mongoDatabaseURI, options);

export default Connection;
