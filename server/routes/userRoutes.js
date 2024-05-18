import express from 'express';
import { registerController } from '../controllers/userController.js';

//Router object
const router = express.Router();

//routes

router.post('/register', registerController)

//export
export default router 