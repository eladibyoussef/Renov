import cloudinary from "../services/cloudinary";
import { Request, Response } from 'express';

export const uploadFiles = (req: Request, res: Response) => {
    console.log(req.body.file); 
    
    if (req.body.file) {
        cloudinary.uploader.upload(req.body.file.thumbUrl, function (err: any, result: { secure_url: any; }) {
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


// import cloudinary from "../services/cloudinary";
// import { Request, Response } from 'express';

// export const uploadFiles = (req: Request, res: Response) => {
//     console.log(req.body.file); 
    
//     if (!req.body.file || req.body.file.length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: 'No files provided'
//         });
//     }

//     const uploadedFiles: any[] = [];
    
//     const uploadPromises = (req.body.file as Express.Multer.File[]).map((file: Express.Multer.File) => {
//         return new Promise<void>((resolve, reject) => {
//             cloudinary.uploader.upload(file.path, function (err: any, result: any) {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                 }
//                 if (result) {
//                     console.log(result);
//                     uploadedFiles.push(result.secure_url);
//                     resolve();
//                 }
//             });
//         });
//     });

//     Promise.all(uploadPromises)
//         .then(() => {
//             res.status(200).json({
//                 success: true,
//                 urls: uploadedFiles
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 success: false,
//                 message: error
//             });
//         });
// };
