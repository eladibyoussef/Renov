import * as dotenv from 'dotenv';
import mongoose, { Connection } from 'mongoose';

dotenv.config();

const uri: string | undefined = process.env.URI;
if (!uri) {
  throw new Error("MongoDB URI not found in environment variables.");
}

mongoose.connect(uri);
const db: Connection = mongoose.connection;


export default db;
