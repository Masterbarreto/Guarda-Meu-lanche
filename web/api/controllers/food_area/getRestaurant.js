import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import yup from "yup";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "../restaurant/shared/checkFoodAreaExists.js";

export const createRestaurantValidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      area_id: yup.number().optional(),
      restaurant_id: yup.number().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const findRestaurant = async (restaurant_id, area_id) => {
  try {
    const not_found = {
      error: {
        message: "lanchonete não encontrada.",
        status: StatusCodes.NOT_FOUND,
      },
    };
    const response = await Knex("restaurants").where({ id: restaurant_id, area_id }).first();
    return response || not_found;

  } catch (error) {
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: "erro ao buscar a lanchonete..",
    };
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { restaurant_id, area_id } = req.params;

    const result = await checkFoodAreaExists(area_id);

    if (result.error) {
      return res.status(result.error.status).json(result);
    }

    const restaurant = await findRestaurant(restaurant_id, area_id);
    return res.status(StatusCodes.OK).json(restaurant);
  } catch (error) {
    return handleError({ r: res, e: error });
  }
};
