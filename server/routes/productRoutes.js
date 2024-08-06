import express from "express";
import { getAllProductsController, getSingleProductController, createProductController,} from "../controllers/productController.js";
import {isAuth} from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router()

//rroutes 
//get all products 
router.get('/get-all',getAllProductsController );

//get single  products
router.get('/:id', getSingleProductController );

//create product 
router.post('/create', isAuth, singleUpload,createProductController)


export default router