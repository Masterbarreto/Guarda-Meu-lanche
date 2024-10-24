import { Router } from "express";
import { userController } from "../controllers/index.js";

const router = Router();

router.get("/validation", userController.verifyQueryValidation, userController.verifyUser)

export { router };
