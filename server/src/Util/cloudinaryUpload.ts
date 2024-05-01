import cloudinary from "../services/cloudinary";
import { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response) => {
    if (req.file) {
        cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err);
                 res.status(500).json({
                    success: false,
                    message: err
                });
            }
            if(result){
               console.log(result);
               
                res.status(200).json({
                    success: true,
                    url: result.secure_url 
                });
            }
            });
    } else {
         res.status(400).json({
            success: false,
            message: 'No file provided'
        });
    }
};
