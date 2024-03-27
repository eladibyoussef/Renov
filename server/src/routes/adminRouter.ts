import { registerAdmin,loginAdmin,deleteAdmin } from "../controllers/adminControllers";
import express, {Router}  from "express";
const adminRouter:Router = express.Router();


adminRouter.post('/register', registerAdmin);
adminRouter.get('/login', loginAdmin);
adminRouter.delete('/:id',deleteAdmin )


export default adminRouter

 
