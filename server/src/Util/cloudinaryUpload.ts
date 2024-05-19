import cloudinary from "../services/cloudinary";
import Product from "../models/Product";
import { Request, Response } from 'express';
import Message from "../models/Message";

export const uploadFiles = async (req: Request, res: Response) => {
    console.log(req.body); 
   const product = await Product.findOneAndUpdate(
    { 'photos.cloudinaryId': req.body.cloudinaryId }, 
    { $pull: { photos: { cloudinaryId: req.body.cloudinaryId } } },{ new: true } 
).exec();
if (product) {
    const cloudResponse =  await cloudinary.uploader.destroy(req.body.cloudinaryId);
  if(cloudResponse.result == 'ok')
    {

        console.log('Photo deleted successfully' , cloudResponse);
        res.status(200).json({product})
    }else{
        res.status(404).json({message: `the file cannot be found: ${cloudResponse} `})
    }

} else {
    console.log('Photo not found in any product');
    res.status(200).json({message: 'Photo not found in any product'})

}   


    // if (req.body.file) {
    //     cloudinary.uploader.upload(req.body.file.thumbUrl, function (err: any, result: { secure_url: any; }) {
    //         if (err) {
    //             console.log(err);
    //              res.status(500).json({
    //                 success: false,
    //                 message: err
    //             });
    //         }
    //         if(result){
    //            console.log(result);
               
    //             res.status(200).json({
    //                 success: true,
    //                 url: result.secure_url 
    //             });
    //         }
    //         });
    // } else {
    //      res.status(400).json({
    //         success: false,
    //         message: 'No file provided'
    //     });
    // }
};

