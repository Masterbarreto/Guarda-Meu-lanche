import { Router } from "express";
import { userController, restaurantController, orderController } from "../controllers/index.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

//#region users

router.post("/users", userController.createValidation, userController.create);
router.get("/users/profile", checkToken("user"), userController.getProfile);
router.patch("/users/", checkToken("user"), userController.updateUser);
router.delete("/users", userController.create);

//#endregion

//#region restaurants

router.post("/restaurants", restaurantController.createValidation, restaurantController.create);
router.get("/restaurants", restaurantController.getAllRestaurants);
router.get("/restaurants/:id", restaurantController.createRestaurantValidation, restaurantController.getRestaurant);
router.get("/restaurants/:id/items", restaurantController.getAllItems);
router.post("/restaurants/:id/items", checkToken("restaurant"), restaurantController.createItemValidation, restaurantController.createItem);
router.get("/restaurants/:id/items/:item_id", restaurantController.idValidation, restaurantController.getItem);
router.patch("/restaurants/:id/items/:item_id", checkToken("restaurant"), restaurantController.update);
router.delete("/restaurants/:id/items/:item_id", checkToken("restaurant"), restaurantController.deleteItem);

//#endregion

//#region orders

router.post("/orders", checkToken("user"), orderController.createOrderValidation, orderController.createOrder);
router.get("/orders/:order_id",checkToken("user"), orderController.orderByIdValidation, orderController.getOrderById);

//#endregion

export { router };