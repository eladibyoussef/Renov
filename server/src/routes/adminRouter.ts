import { registerAdmin,loginAdmin } from "../controllers/adminControllers";
import express, {Router}  from "express";
const adminRouter:Router = express.Router();


adminRouter.post('/register', registerAdmin)
adminRouter.get('/login', loginAdmin)


export default adminRouter

 
