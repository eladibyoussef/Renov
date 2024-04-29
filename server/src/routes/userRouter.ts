import { authentication } from './../config/jwtPassport';
import { loginUser , registerUser, getProfile, updateProfile, deleteProfile ,getAllUsers } from "../controllers/userControllers";
import express, {Router}  from "express";
const userRouter:Router = express.Router();

userRouter.get('/AllUsers' , getAllUsers)

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.get('/:id', getProfile);


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               paymentMethods:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.put('/:id', updateProfile);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user profile by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

userRouter.delete('/:id', deleteProfile);


export default userRouter