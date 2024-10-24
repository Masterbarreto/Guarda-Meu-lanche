import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "./shared/checkFoodAreaExists.js";

export const deleteValidation = validation((schema) => ({
  params: yup.object().shape({
    item_id: yup.number(),
  }),
}));

const checkRestaurant = async (id) => Knex("restaurants").where({ id }).first();
const checkItem = async (id) => Knex("menu_item").where({ id }).first();
const deleteItemFromDatabase = async (id) =>
  Knex("menu_item").where({ id }).first().delete();

export const deleteItem = async (req, res) => {
  const { item_id } = req.params;
  const { area_id, id } = req.credentials;

  const area = await checkFoodAreaExists(area_id);

  if (area.error) {
    return res.status(area.error.status).json(area);
  }
  const restaurant = await checkRestaurant(id);

  if (restaurant.id !== req.credentials.id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "não autorizado" });
  }

  if (!restaurant) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "lanchonete não encontrada" });
  }

  const item = await checkItem(item_id);

  if (!item) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "item não encontrado" });
  }
  try {
    deleteItemFromDatabase(item_id).then(() => {
      return res.status(StatusCodes.OK).json({ status: "ok" });
    });
  } catch (e) {
    return handleError({ r: res, e: error });
  }
};
