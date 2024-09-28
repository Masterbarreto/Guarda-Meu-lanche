import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "./shared/checkFoodAreaExists.js";

const findItems = async (query) => {
  try {
    const items = await Knex("menu_item").select("*").where(query).returning("id");
    return { length: items.length, items };
  } catch (e) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao buscar os items.",
    };
  }
};

const checkRestaurant = async (id, area_id) =>
  Knex("restaurants").where({ id, area_id }).first();

export const getAllItems = async (req, res) => {
  const { id, area_id } = req.credentials;

  const result = await checkFoodAreaExists(area_id);
  if (result.error) {
    return res.status(result.error.status).json(result);
  }

  const restaurant = await checkRestaurant(id, area_id);
  if (!restaurant) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "lanchonete não encontrada." });
  }

  try {
    const items = await findItems({
      restaurant_id: id,
    });

    return res.status(StatusCodes.CREATED).json(items);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
