import { loginUser , registerUser, getAllUsers, getProfile, updateProfile, deleteProfile } from "../controllers/userControllers";
import express, {Router}  from "express";
const userRouter:Router = express.Router();


userRouter.post('/register', registerUser);
userRouter.get('/login', loginUser);
userRouter.get('/all-users', getAllUsers);
userRouter.get('/:id', getProfile);
userRouter.put('/:id', updateProfile);
userRouter.delete('/:id', deleteProfile);


export default userRouter