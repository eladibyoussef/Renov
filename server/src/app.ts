import express from 'express';
import { Request, Response } from 'express';
import adminRouter from './routes/adminRouter';
import professionalRouter from './routes/proffessionalRoutes';
import userRouter from './routes/userRouter';
import serviceRouter from './routes/servicesRouter';
import diyRouter from './routes/diyRouter';
import sellerRouter from './routes/sallerRouter';
import OrderRouter from './routes/OrderRoute';
import geolocationRouter from './routes/geolocationRoutre';
import db from './config/database';
import * as dotenv from 'dotenv';
import { authentication  } from './config/jwtPassport';
import { checkAuthorization } from './middlewares/authorization';


dotenv.config();

const app = express();
const PORT: number = 1337;
const secret = process.env.SECRET
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
app.use('/user', userRouter);
app.use('/pro', professionalRouter)
app.use('/seller', sellerRouter);

app.use('/services', serviceRouter)
app.use('/diy', diyRouter)
app.use('/order', OrderRouter)
app.use('/geolocation', geolocationRouter)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
