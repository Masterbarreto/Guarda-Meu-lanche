import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import yup from "yup";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";

export const orderByIdValidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      order_id: yup.number().required(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const checkUser = async (id) => await Knex("users").where({ id }).first();

const gerOrder = async (order_id) => {
  const orderDetails = await Knex("food_order")
    .join("restaurants", "food_order.restaurant_id", "restaurants.id")
    .where("food_order.id", order_id)
    .select("food_order.*", "restaurants.name as restaurant_name")
    .first();

  if (!orderDetails) {
    return { error: { message: "pedido não encontrado", status: 404 } };
  }

  const items = await Knex("order_items")
    .join("menu_item", "order_items.menu_item_id", "menu_item.id")
    .where("order_items.order_id", order_id)
    .select(
      "menu_item.id",
      "menu_item.name",
      "menu_item.price",
      "menu_item.desc",
      "order_items.quantity"
    );

  return {
    status: orderDetails.status,
    total_price: orderDetails.total_price,
    order_date: orderDetails.order_date,
    restaurant: { name: orderDetails.restaurant_name, id: orderDetails.restaurant_id },
    items,
  };
};

export const getOrderById = async (req, res) => {
  try {
    const { credentials } = req;
    const { order_id } = req.params;

    const user = await checkUser(credentials.id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "usuario não encontrado" });
    }

    const order = await gerOrder(order_id);

    return res.status(StatusCodes.OK).json(order);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
