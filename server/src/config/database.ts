import * as dotenv from 'dotenv';
import mongoose, { Connection } from 'mongoose';

dotenv.config();

const url: string | undefined = process.env.URI || 'mongodb+srv://demoproject:admins@cluster0.x7vj90f.mongodb.net/e-com';
if (!url) {
  throw new Error("MongoDB URI not found in environment variables.");
}

mongoose.connect(url);
const db: Connection = mongoose.connection;


export default db;
