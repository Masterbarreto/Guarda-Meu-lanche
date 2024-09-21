import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";

const findItems = async (body) => {
  try {
    const items = await Knex("menu_item").where(body).returning("id");
    return { length: items.length, items };
  } catch (e) {
    console.log(e);
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao buscar os items",
    };
  }
};

const checkRestaurant = async (id) => Knex("restaurants").where({ id }).first();

export const getAllItems = async (req, res) => {
  const { id } = req.params;
  const restaurant = await checkRestaurant(id);

  if (!restaurant) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "lanchonete não encontrada" });
  }

  try {
    const items = await findItems({
      restaurant_id: id,
    });

    return res.status(StatusCodes.CREATED).json(items);
  } catch (e) {
    return handleError({ r: res, e: error });
  }
};
