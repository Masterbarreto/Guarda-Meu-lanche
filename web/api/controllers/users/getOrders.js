import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";

const getOrdersFromDatabase = async (user_id) => {
  let orders = await Knex("food_order").where({ user_id });

  orders = orders.map((i) => {
    const { id, ...rest } = i;
    rest.order_id = id;
    return rest;
  });

  return { length: orders.length, orders };
};

export const getOrders = async (req, res) => {
  try {
    const id = req.credentials.id;

    const orderResponse = await getOrdersFromDatabase(id);
    if (orderResponse.length < 1) {
        
      return res.status(StatusCodes.OK).json({
        message: "você não tem pedidos.",
        status: StatusCodes.OK,
      });
    }

    return res.status(StatusCodes.OK).json(orderResponse);
  } catch (e) {
    handleError({ r: res, e });
  }
};
