import express , {Router} from 'express'
import { registrationRequest, registrationApproval, professionalLogin, changePassword } from '../controllers/professionalControllers'
const professionalRouter = express.Router();


professionalRouter.post('/request-register', registrationRequest);
professionalRouter.post('/approve-request', registrationApproval);
professionalRouter.post('/login', professionalLogin);
professionalRouter.put('/change-password' , changePassword)

export default professionalRouter