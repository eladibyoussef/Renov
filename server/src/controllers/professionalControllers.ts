import { Request, Response } from "express";
import Professional, { ProfessionalDocument } from "../models/Professional";
import { catchError } from "../Util/errorCatch";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// the controller for the first time professional join requests tha will be later processed and approved by the admin
export const registrationRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  
  const {
    CIN,
    license,
    username,
    email,
    phoneNumber,
    address,
    servicesProvided,
  } = req.body;
  try {
    const professional: ProfessionalDocument | null =
      await Professional.findOne({ CIN: CIN });
    if (professional) {
      res
        .status(409)
        .json({
          message: "a request with the prvided information already in process",
        });
    } else {
      const newProfessional = new Professional({
        CIN,
        license,
        username,
        email,
        phoneNumber,
        address,
        servicesProvided,
      });
      const savenewProfessional = await newProfessional.save();
      if (savenewProfessional) {
        res
          .status(201)
          .json({
            message:
              "your request is successfully submitted, we will process it and get back to you as soon as possible ",
          });
      } else {
        res
          .status(500)
          .json({ message: "internal server error , please try again later" });
      }
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

//the regitration approval route will be accessed by the admin to approve or reject the pro request
export const registrationApproval = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, temporaryPassword, approvalStatus, reason, permissions } =
    req.body;
  try {
    const professional = await Professional.findById(id);
    if (!professional) {
      res.status(404).json({ message: "cannot find any ongoing request" });
    } else {
      professional.approved.approvalStatus = approvalStatus;
      professional.approved.reason = reason;
      professional.password = temporaryPassword;
      professional.permissions = permissions;
      const updatePro = await professional.save();
      if (!updatePro) {
        res
          .status(500)
          .json({
            message: "cannot update the information , please try again",
          });
      } else {
        res.status(201).json({ message: "status updated successfuly" });
      }
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

// after approval the prfessional can change the default password provided by the admin , and also they can use the same route to change their password

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const professional: ProfessionalDocument | null =
      await Professional.findOne({ email });
    if (!professional) {
      res.status(404).json({ message: "can't find any pro account " });
    } else {
      const PasswordsMatch: boolean = await bcrypt.compare(
        oldPassword,
        professional.password
      );
      if (!PasswordsMatch) {
        res.status(400).json({ message: "invalid credencials" });
      } else {
        professional.password = newPassword;
        const updatePro = await professional.save();
        if(updatePro){

            res.status(201).json({message:'pessword updated successfully'})
        }else{
            res.status(500).json({message:'something went wrong , please try agin later'})
        }
      }
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

export const professionalLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const professional: ProfessionalDocument | null =
      await Professional.findOne({ email });
    if (!professional) {
      res.status(404).json({ message: "can't find any pro account " });
    } else if (professional && professional.approved.approvalStatus) {
      const PasswordsMatch: boolean = await bcrypt.compare(
          password,
        professional.password
      );
      if (PasswordsMatch) {
        const payload = {
          user: professional,
          type: "professional",
        };
        const key = process.env.SECRET || "bsd25hgGG2156ljhcv";

        jwt.sign(
          payload,
          key,
          (err: Error | null, token: string | undefined) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .json({ message: "failed to complete the sing in process" });
            } else {
              res.status(200).json({
                success: true,
                token: "Bearer " + token,
              });
            }
          }
        );
      } else {
        res.status(400).json({ msg: "invalid credencials" });
      }
    } else {
      res
        .status(403)
        .json({ message: "the requested account cannot be accessed" });
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

export const getAllprfessionals = async (req: Request, res: Response): Promise<void> => {
    const { approvalStatus , sort } = req.query;
    try {
        if (!approvalStatus){
            const professionals = await Professional.find()
              if(!professionals){
                res.status(404).json({message:"no pros found "})
              }else{
                res.status(200).json(professionals)
              } 
        
        }else{
            const professionals = await Professional.find({'approved.approvalStatus': approvalStatus})
            if(!professionals){
              res.status(404).json({message:"no pros found "})
            }else{
              res.status(200).json(professionals)
            } 
      
        }
        
    } catch (error) {
        let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
    }

}

export const updateProAccount =  async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id
        const informationToUpdate = req.body
        delete informationToUpdate.password;
        delete informationToUpdate.permissions
        delete informationToUpdate.approved
        console.log(informationToUpdate);
        
         try {
            const accountToUpdate = await Professional.findByIdAndUpdate(id , informationToUpdate , {new:true});
            if (!accountToUpdate){
              res.status(404).json({message:"we are sorry , we cant find your accoun"})
            }else {
           res.status(200).json({message:'account updated', accountToUpdate})
            }
        } catch (error) {
            let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
        }
}

export const getProAccount= async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body    
    try {
        const professional = await Professional.find({email:email});
        if (!professional){
            res.status(404).json({message:'no user found'})
        }else{
            res.status(201).json({professional})
        }
    } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message });
    }
}

export const deleteProAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const id =req.params.id
        const deletedPro = await Professional.findByIdAndDelete(id);

        if (!deletedPro) {
         res.status(404).json({ message: 'professional  not found' });
        }

        res.status(200).json({ message: 'professional account deleted successfully' });
    } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message });
    }
}

//the next controller using regular expressions to perform searchs through the professional document
//using multiple keywords , I used the regular expressions in order to assure that if the pro is available in our db it  appears in the results whatever the keywords used
//so basically the user can search by license , name , company, email ... at the same time 
//and only the approved pros will be returned in the search results 

export const searchForPro =async (req: Request, res: Response): Promise<void> => {
    try {
        const keywords: string[] = req.query.keywords as string[];
        console.log(keywords);

        let regexPatterns: RegExp[];
if (Array.isArray(keywords)) {
    regexPatterns = keywords.map(keyword => new RegExp(keyword, 'i'));
} else {
    regexPatterns = [new RegExp(keywords, 'i')];
}
        console.log(regexPatterns);
        const professionals: ProfessionalDocument[] = await Professional.find({
            $and: [
                {

                    $or: [
                        { license: { $in: regexPatterns } },
                        { username: { $in: regexPatterns } },
                        { email: { $in: regexPatterns } },
                        {companyname:{$in: regexPatterns}},
                        {aboutMe:{$in: regexPatterns}},
                        {servicesProvided:{$in: regexPatterns}},
                        {address:{$in:regexPatterns}}
                    ]
                },
             { 'approved.approvalStatus': true}
                
            ]
        });        
    if(!professionals){
        res.status(404).json({message:'cannot find a pro'})
    }else{
        res.status(200).json({results:professionals})
    }
    

    } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message });
    }
}

export const rateProfessional = async (req: Request, res: Response): Promise<void> => {
    try {
        const {userId,rating,comment} = req.body;
        const proId = req.params.id;
        const professional = await Professional.findById(proId);
    if (!professional){
    res.status(404).json({message:'professional not found'});
    
    }else{
        professional.reviews?.push({userId,rating,comment})
        const totalReviews= professional.reviews?.length
        const ratingSum = professional.reviews?.reduce((accumulator, review) => accumulator + review.rating, 0);
        if(ratingSum&&totalReviews){
            professional.overallRating = ratingSum/totalReviews;
            const ratingAded= await professional.save();
        
       if(!ratingAded){
        res.send(500).json({message:'internal server error '})
       }
       res.status(200).json({message:'thank you for submitting the review, it was added successfully', ratingaverage: professional.overallRating})}
    }
        
    } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message });
    }
}