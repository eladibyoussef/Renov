import { Request, Response } from 'express';
import { catchError } from '../Util/errorCatch';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/User';
import { log } from 'console';



const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    log(req.body)
    try {
        const user: UserDocument | null = await User.findOne({ email: email });
        if (!user) {
            const newUser = new User({
                username: username,
                email: email,
                password: password,
            });
            const savedUser = await newUser.save();
            console.log("savedUser:", savedUser);
            if (savedUser) {
                res.status(201).json({ msg: "success", user: savedUser });
            } else {
                res.status(500).json({ msg: "something went wrong , please try again later " });
            }
        } else {
            res.status(409).json({ message: "please try other credentials" });
        }
    } catch (error:unknown) {
        let message:string;
        message = catchError(error) ;       
        res.status(500).json({ msg: message});       
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log(req.body);
    
    try {
        const user: UserDocument | null = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({ msg: "invalid credentials" });
        } else {
            const passMatch: boolean = await bcrypt.compare(password, user.password);
            if (passMatch) {
                
                const payload = {  user: user, type:'user'  };
                console.log('signed payload', payload);
                // console.log('SECRET', process.env.SECRET);              
                const key = process.env.SECRET || 'bsd25hgGG2156ljhcv';
                jwt.sign(
                    payload,
                    key,
                    { expiresIn: 86400000 },
                    (err: Error | null, token: string | undefined) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Failed to generate token' });
                        } else if (token) {
                            res.status(200).json({
                                success: true,
                                user: user,
                                token: "Bearer " + token,
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({ msg: "invalid credencials" });
            }
        }
    } catch (error:unknown) {
        catchError(error) ;       
    }
};

//get user profile
const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
         res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        
        const userId = req.params.id;
        const { username, email, phoneNumber, address, location, paymentMethods } = req.body; 
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            email,
            phoneNumber,
            address,
            location,
            paymentMethods
        } , {new:true});

        if (!updatedUser) {
         res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error});
    }
};

const deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
       
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
         res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find()
        if (!users){
            res.status(404).json({message: 'no users found'})
        }
        res.status(200).json(users)

    } catch (error) {
             let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message });
    }
}

export { registerUser,
         loginUser,
         getProfile,
         updateProfile,
         deleteProfile ,
         getAllUsers
    };