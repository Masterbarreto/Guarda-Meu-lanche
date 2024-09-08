import { Router } from "express";
import { userController } from "../controllers/index.js"

const router = Router();

router.post('/users', userController.createValidation, userController.create);
router.delete('/users', userController.create);

// Nao implementado
// router.get('/orders', );
// router.delete('/orders',);

export { router };