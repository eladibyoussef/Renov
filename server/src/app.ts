import express from 'express';
// import { Application, urlencoded, json } from 'express';

import db from './config/database';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT: number = 1337;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB Atlas!");
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
