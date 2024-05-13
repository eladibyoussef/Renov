import express , {Router} from 'express'
import { rateProfessional,deleteProAccount,getProAccount,registrationRequest, registrationApproval, professionalLogin, changePassword , getAllprfessionals, updateProAccount, searchForPro} from '../controllers/professionalControllers'
const professionalRouter = express.Router();

/**
 * @swagger
 * /api/professionals/request-register:
 *   post:
 *     summary: Submit a registration request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CIN:
 *                 type: string
 *               license:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               servicesProvided:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Request submitted successfully.
 *       '409':
 *         description: Request with provided information already in process.
 *       '500':
 *         description: Internal server error.
 */

professionalRouter.post('/request-register', registrationRequest);

/**
 * @swagger
 * /api/professionals/approve-request:
 *   post:
 *     summary: Approve or reject a professional registration request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               temporaryPassword:
 *                 type: string
 *               approvalStatus:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Status updated successfully.
 *       '404':
 *         description: No ongoing request found with the provided ID.
 *       '500':
 *         description: Internal server error, failed to update information.
 */
professionalRouter.post('/approve-request', registrationApproval);
professionalRouter.post('/login', professionalLogin);
professionalRouter.put('/change-password' , changePassword);
professionalRouter.get('/getAllPros', getAllprfessionals);
professionalRouter.get('/',searchForPro)
professionalRouter.get('/account',getProAccount);
professionalRouter.post('/:id/rate', rateProfessional)
professionalRouter.put('/:id', updateProAccount);
professionalRouter.delete('/:id', deleteProAccount)



export default professionalRouter