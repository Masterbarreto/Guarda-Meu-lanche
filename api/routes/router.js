import { Router } from "express";
import { userController } from "../controllers/index.js"

const router = Router();

router.get('/users', userController.create);

export { router };