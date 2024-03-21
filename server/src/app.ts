import express from 'express';
import { Request, Response } from 'express';
import adminRouter from './routes/adminRouter';
// import { Application, urlencoded, json } from 'express';
import db from './config/database';
import * as dotenv from 'dotenv';
import { authentication  } from './config/jwtPassport';
import { checkAuthorization } from './middlewares/authorization';


dotenv.config();

const app = express();
const PORT: number = 1337;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB Atlas!");
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/superProtect',checkAuthorization('superAdmin'),authentication,(req:Request,res:Response)=>{  
  res.status(200).json({msg:'you are connected'})
})



app.use('/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
