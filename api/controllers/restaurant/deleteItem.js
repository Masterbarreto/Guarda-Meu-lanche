import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";

const checkRestaurant = async (id) => Knex("restaurants").where({ id }).first();
const checkItem = async (id) => Knex("menu_item").where({ id }).first();
const deleteItemFromDatabase = async (id) => Knex("menu_item").where({ id }).first().delete();

export const deleteItem = async (req, res) => {
  const { id, item_id } = req.params;
  const restaurant = await checkRestaurant(id);

  if (restaurant.id !== req.credentials.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "não autorizado" });
  }

  if (!restaurant) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "lanchonete não encontrada" });
  }

  const item = await checkItem(item_id);

  if (!item) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "item não encontrado" });
  }
  try {
    deleteItemFromDatabase(item_id).then(() => {
      return res.status(StatusCodes.OK).json({status:'ok'});
    });
  } catch (e) {
    return handleError({ r: res, e: error });

  }
};
