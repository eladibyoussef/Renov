import { Request, Response } from 'express';
import Seller from '../models/Seller';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerSeller = async (req: Request, res: Response) => {
    try {
        const { name, email, password, companyName } = req.body;

        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newSeller = new Seller({ name, email, password: hashedPassword, companyName });
        await newSeller.save();

        res.status(201).json({ message: 'Seller registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginSeller = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (!seller) {
            res.status(404).json({ msg: "Invalid credentials" });
        } else {
            const passwordMatch = await bcrypt.compare(password, seller.password);
            if (passwordMatch) {
                const payload = { id: seller._id, email: seller.email, type: 'seller' };
                const key = process.env.SECRET || 'bsd25hgGG2156ljhcv';
                jwt.sign(
                    payload,
                    key,
                    { expiresIn: 3600000 },
                    (err: Error | null, token: string | undefined) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Failed to generate token' });
                        } else if (token) {
                            res.status(200).json({
                                success: true,
                                seller: seller,
                                token: "Bearer " + token,
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateSellerProfile = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params;
        const { name, email, companyName } = req.body;

        const existingSeller = await Seller.findById(sellerId);
        if (!existingSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        existingSeller.name = name;
        existingSeller.email = email;
        existingSeller.companyName = companyName;
        await existingSeller.save();

        res.status(200).json({ message: 'Seller profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteSeller = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params;

        await Seller.findByIdAndDelete(sellerId);

        res.status(200).json({ message: 'Seller account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
