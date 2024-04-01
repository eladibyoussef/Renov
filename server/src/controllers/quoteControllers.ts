import { Request, Response } from "express";
import cloudinary from "../services/cloudinary";
import { catchError } from "../Util/errorCatch";
import Quote , {QuoteDocument} from "../models/Quote";
import { uploadFile } from "../Util/cloudinaryUpload";



export const uploadQoute = async (req: Request, res: Response): Promise<void> => {
         console.log(req.file)
    try {
        const { userId, professionalId, description, status, appointment, totalPrice } = req.body;
         if (req.file){
            const result = uploadFile(req,res)
            if(result){
                const quote = new Quote({
                    userId,
                        professionalId,
                        description,
                        status,
                        filePath: (await result).url,
                        publicId: (await result).public_id,
                        appointment,
                        totalPrice
                    });
                    
                    const savedQuote = await quote.save();
                    res.status(201).json(savedQuote);
            }else{
                res.status(500).json({error:'there was a problem uploading the file to the cloud'})
            }
             
            }
      } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message });      }

}

export const deleteQuote = async (req: Request, res: Response): Promise<void> => {

   const quoteId = req.params.id
   try {
            const quote: QuoteDocument|null = await Quote.findByIdAndDelete(quoteId);
            if(quote){
                const result = await  cloudinary.uploader.destroy(quote?.publicId)
                console.log(result);
                res.status(200).json({message: " quote deleted successfully " , result})
                 }
   } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message }); 
   }
}

export const updateQuote = async (req: Request, res: Response): Promise<void> => {
    try {
        const quoteId = req.params.id
        const quote = await Quote.findById(quoteId);
        if (quote){
            const deleteResult = await  cloudinary.uploader.destroy(quote?.publicId)
            
                const result = uploadFile(req,res)
                if (result){

                    quote.filePath = (await result).url
                    quote.publicId =  (await result).public_id
                }
                const newQuote = await quote.save()
                if(!newQuote) {res.status(500).json({message:'internal server error , please try again '})}
                res.status(200).json({message:'quote updtated' ,  newQuote})
            
            }else{
            res.status(404).json({message:"no quote was found "})

        }
        
    } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message }); 
    }
}

export const getQuote = async (req: Request, res: Response): Promise<void> => {
    try {
        const quoteId = req.params.id
        const quote = await Quote.findById(quoteId);
        if(!quote){
            res.status(404).json({message:"no qoute founded"})
        }
         res.status(200).json(quote)

    } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message }); 
        
    }
           
}

