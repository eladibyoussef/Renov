import express , {Router} from 'express'
import { rateProfessional,deleteProAccount,getProAccount,registrationRequest, registrationApproval, professionalLogin, changePassword , getAllprfessionals, updateProAccount, searchForPro} from '../controllers/professionalControllers'
const professionalRouter = express.Router();


professionalRouter.post('/request-register', registrationRequest);
professionalRouter.post('/approve-request', registrationApproval);
professionalRouter.post('/login', professionalLogin);
professionalRouter.put('/change-password' , changePassword);
professionalRouter.get('/get-Pros', getAllprfessionals);
professionalRouter.get('/',searchForPro)
professionalRouter.get('/account',getProAccount);
professionalRouter.post('/:id/rate', rateProfessional)
professionalRouter.put('/:id', updateProAccount);
professionalRouter.delete('/:id', deleteProAccount)



export default professionalRouter