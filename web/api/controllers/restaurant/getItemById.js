import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "./shared/checkFoodAreaExists.js";

export const idValidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      item_id: yup.number().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const findItem = async (id) => {
  try {
    const item = await Knex("menu_item")
      .select(["name", "price", "id", "desc",'url'])
      .where({ id })
      .first();

    if (!item) {
      return {
        error: "item não encontrado",
        status: StatusCodes.NOT_FOUND,
      };
    }

    return item;
  } catch (e) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao buscar o item.",
    };
  }
};

const checkRestaurant = async (id) => Knex("restaurants").where({ id }).first();

export const getItem = async (req, res) => {
  const { item_id } = req.params;
  const { id, area_id } = req.credentials;

  const result = await checkFoodAreaExists(area_id);
  if (result.error) {
    return res.status(result.error.status).json(result);
  }

  const restaurant = await checkRestaurant(id);
  if (!restaurant) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "lanchonete não encontrada." });
  }

  try {
    const items = await findItem(item_id);

    return res.status(StatusCodes.CREATED).json(items);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
