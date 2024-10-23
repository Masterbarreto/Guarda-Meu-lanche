import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "../restaurant/shared/checkFoodAreaExists.js";

const checkRestaurant = async (restaurant_id, area_id) =>
  await Knex("restaurants").where({ id: restaurant_id, area_id }).first();

const findItems = async (restaurant_id) => {
  const items = await Knex("menu_item")
    .select(["name", "price", "id", "url", "desc"])
    .where({ restaurant_id });

  return {
    length: items.length,
    items,
  };
};

export const getRestaurantItems = async (req, res) => {
  try {
    const { restaurant_id, area_id } = req.params;

    const result = await checkFoodAreaExists(area_id);
    if (result.error) {
      return res.status(result.error.status).json(result);
    }

    const restaurant = await checkRestaurant(restaurant_id, area_id);
    if (!restaurant) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: "lanchonete não encontrada.",
          status: StatusCodes.NOT_FOUND,
        },
      });
    }

    const items = await findItems(restaurant_id);

    if (!items) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: "items não encontrado na lanchoneteß.",
          status: StatusCodes.NOT_FOUND,
        },
      });
    }
    return res.status(StatusCodes.OK).json(items);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
