import { Router } from "express";
import { userController, restaurantController, menuItensController } from "../controllers/index.js"
import { checkToken } from '../middlewares/checkToken.js'
const router = Router();

router.post('/users', userController.createValidation, userController.create);
router.delete('/users', userController.create);

router.post('/restaurants', restaurantController.createValidation, restaurantController.create);

router.post('/itens', checkToken('restaurant'), menuItensController.createValidation, menuItensController.create);

// Nao implementado
// router.get('/orders', );
// router.delete('/orders',);

export { router };