import { Router } from "express";
import {
  userController,
  restaurantController,
  orderController,
  foodAreaController,
  termsController,
} from "../controllers/index.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

//#region users

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas a usuários
 */

router.post("/users", userController.createValidation, userController.create);
router.post("/users/login", userController.loginValidation, userController.login);
router.post("/users/logout", checkToken("user"), userController.logout);
router.get("/users/profile", checkToken("user"), userController.getProfile);
router.get("/users/orders", checkToken("user"), userController.getOrders);
router.get("/users/orders/:order_id", checkToken("user"), userController.orderByIdValidation, userController.getOrderById);
router.patch("/users", checkToken("user"), userController.updateValidation, userController.updateUser);
router.get("/users/:user_id", userController.getByIdValidation, userController.getUserById);
router.delete("/users/", checkToken("user"), userController.deleteUser);
router.post("/users/verify/", userController.verifyQueryValidation, userController.verifyUser);

//#endregion

//#region area

router.post("/area/", foodAreaController.createValidation, foodAreaController.create);
router.get("/area/", foodAreaController.getAll);
router.get("/area/:area_id/restaurants", foodAreaController.getAllRestaurants);
router.get("/area/:area_id/restaurants/:restaurant_id", foodAreaController.createRestaurantValidation, foodAreaController.getRestaurant);
router.get("/area/:area_id/restaurants/:restaurant_id/items", foodAreaController.createRestaurantValidation, foodAreaController.getRestaurantItems);
router.get("/area/:area_id/restaurants/:restaurant_id/items/:item_id", foodAreaController.restaurantGetItemValidation, foodAreaController.getRestaurantItemById);

//#endregion

//#region restaurants

router.post(
  "/restaurants",
  restaurantController.createValidation,
  restaurantController.create
);
router.get(
  "/restaurants/profile",
  checkToken("restaurant"),
  restaurantController.getProfile
);
router.get(
  "/restaurants/items",
  checkToken("restaurant"),
  restaurantController.getAllItems
);
router.post(
  "/restaurants/items",
  checkToken("restaurant"),
  restaurantController.createItemValidation,
  restaurantController.createItem
);
router.patch(
  "/restaurants/items/:item_id",
  checkToken("restaurant"),
  restaurantController.updateValidation,
  restaurantController.update
);
router.delete(
  "/restaurants/items/:item_id",
  checkToken("restaurant"),
  restaurantController.deleteValidation,
  restaurantController.deleteItem
);
router.get(
  "/restaurants/items/:item_id",
  checkToken("restaurant"),
  restaurantController.idValidation,
  restaurantController.getItem
);

//#endregion

//#region orders

router.post(
  "/orders",
  checkToken("user"),
  orderController.createOrderValidation,
  orderController.createOrder
);
router.get(
  "/orders/:order_id",
  checkToken("user"),
  orderController.orderByIdValidation,
  orderController.getOrderById
);

//#endregion

//#region terms

router.get("/terms", termsController.terms);
//#endregion

export { router  as apiRouter};
