import { StatusCodes } from "http-status-codes";
import yup from "yup";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";
import validation from "../../middlewares/validation.js";

export const orderByIdValidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      order_id: yup.number().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const checkOrders = async (user_id) => {
  let orders = await Knex("food_order").where({ user_id });

  return orders.length > 1 ? true : false;
};

const getOrder = async (order_id, user_id) => {
  let order = await Knex("food_order").where({ id: order_id, user_id }).first();

  if (!order) return false;

  const { id, ...rest } = order;
  rest.order_id = id;

  return rest;
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.credentials.id;
    const order_id = req.params.order_id;

    const hasOrders = await checkOrders(id);

    if (!hasOrders) {
      return res.status(StatusCodes.OK).json({
        message: "você ainda não tem pedidos",
        status: StatusCodes.OK,
      });
    }

    const order = await getOrder(order_id, id);

    if (!order) {
      return res.status(StatusCodes.OK).json({
        message: "pedido não encontrado.",
        status: StatusCodes.NOT_FOUND,
      });
    }

    return res.status(StatusCodes.OK).json(order);
  } catch (e) {
    handleError({ r: res, e });
  }
};
