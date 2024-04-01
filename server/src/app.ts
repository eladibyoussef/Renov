import express from 'express';
import { Request, Response } from 'express';
import adminRouter from './routes/adminRouter';
import professionalRouter from './routes/proffessionalRoutes';
import reviewRouter from './routes/reviewRouter';
import userRouter from './routes/userRouter';
import serviceRouter from './routes/servicesRouter';
import diyRouter from './routes/diyRouter';
import paymentRouter from './routes/paymentRoute';
import sellerRouter from './routes/sallerRouter';
import OrderRouter from './routes/OrderRoute';
import geolocationRouter from './routes/geolocationRoutre';
import db from './config/database';
import * as dotenv from 'dotenv';
import { authentication  } from './config/jwtPassport';
import { checkAuthorization } from './middlewares/authorization';
import messageRouter from "./routes/chatRouter";
import { app, server } from "./socket/socket";
import quoteRouter from './routes/quoteRouter';



dotenv.config();

const PORT: number = 1337;
const app = express();
const secret = process.env.SECRET
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB Atlas!");
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/superProtect',checkAuthorization('superAdmin'),authentication,(req:Request,res:Response)=>{  
  res.status(200).json({msg:'you are connected'})
});

app.use('/admin', adminRouter)
app.use('/user', userRouter);
app.use('/pro', professionalRouter);
app.use('/reviews', reviewRouter);
app.use('/services', serviceRouter);
app.use('/diy', diyRouter);
app.use('/payment', paymentRouter);


app.use('/pro', professionalRouter)
app.use('/seller', sellerRouter);

app.use('/services', serviceRouter)
app.use('/diy', diyRouter)
app.use('/messages',messageRouter)
app.use('/quote', quoteRouter)
app.use('/order', OrderRouter)
app.use('/geolocation', geolocationRouter)


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
