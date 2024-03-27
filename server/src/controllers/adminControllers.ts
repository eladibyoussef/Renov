import { Request, Response } from 'express';
import { catchError } from '../Util/errorCatch';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin, {adminDocument}  from '../models/Admin';
import { log } from 'console';

const registerAdmin = async (req: Request, res: Response): Promise<void> => {
    const { ref,username, email, password,phoneNumber,address ,permissions } = req.body;
    log(req.body)
    try {
        const user: adminDocument | null = await Admin.findOne({ email: email });
        if (!user) {
            const newAdmin= new Admin({
                ref,
                username,
                email,
                password,
                phoneNumber,
                address,
                permissions

            });
            const savedAdmin = await newAdmin.save();
            console.log("savedAdmin:", savedAdmin);
            if (savedAdmin) {
                res.status(201).json({ msg: "success", user: savedAdmin });
            } else {
                res.status(500).json({ msg: "something went wrong , please try again later " });
            }
        } else {
            res.status(500).json({ message: "please try other credentials" });
        }
    } catch (error:unknown) {
        let message:string;
        message = catchError(error) ;       
        res.status(401).json({ msg: message});       
    }
};

const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log(req.body);
    
    try {
        const admin: adminDocument | null = await Admin.findOne({ email: email });
        if (!admin) {
            res.status(404).json({ msg: "invalid credentials" });
        } else {
            const passMatch: boolean = await bcrypt.compare(password, admin.password);
            if (passMatch) {
                console.log(admin);
                
                const payload = { id: admin.id, username: admin.username, permissions:admin.permissions , type:'admin' };
                // console.log('signed payload', payload);
                // console.log('SECRET', process.env.SECRET);              
                
                jwt.sign(
                    payload,
                    process.env.SECRET || '155fgnknbdg5dthrth',
                    { expiresIn: 3600000 },
                    (err: Error | null, token: string | undefined) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ msg: 'Failed to generate token' });
                        } else if (token) {
                            res.status(200).json({
                                success: true,
                                admin:admin,
                                token: "Bearer " + token,
                            });
                        }
                    }
                );
            } else {
                res.status(401).json({ msg: "Password doesn't match" });
            }
        }
    } catch (error:unknown) {
        catchError(error) ;       
    }
};

const deleteAdmin= async (req: Request, res: Response): Promise<void> => {

    try {
        const id =req.params.id
        const admin = await Admin.findByIdAndDelete(id);

        if (!admin) {
         res.status(404).json({ message: 'admin  not found' });
        }

        res.status(200).json({ message: 'admin  deleted successfully' });
    } catch (error) {
        let message: string;
        message = catchError(error);
        res.status(500).json({ msg: message });
    }
}


export { registerAdmin, loginAdmin,deleteAdmin };
