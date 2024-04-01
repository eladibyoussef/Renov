import express, { Router } from 'express';
import { uploadQoute , deleteQuote, updateQuote} from '../controllers/quoteControllers';
import upload from "../middlewares/multer";


const quoteRouter: Router = express.Router();


quoteRouter.post('/upload',upload.single('quote'), uploadQoute)
quoteRouter.delete('/delete/:id', deleteQuote )
quoteRouter.put('/update/:id',upload.single('quote'), updateQuote)

export default quoteRouter