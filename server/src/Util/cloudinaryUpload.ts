import cloudinary from "../services/cloudinary";
import { Request , Response} from 'express';

export const uploadFile = (req:Request, res:Response)  =>{
    if (req.file){
       const fileUploaded =  cloudinary.uploader.upload(req.file.path, function (err, result){
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err
                })
            }
            
            
            return result
        })
        return fileUploaded
    }
}


