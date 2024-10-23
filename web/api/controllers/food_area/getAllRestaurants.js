import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "../restaurant/shared/checkFoodAreaExists.js";
import validation from "../../middlewares/validation.js";

export const createVaglidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      area_id: yup.number(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const getAll = async (area_id) => {
  try {
  } catch (e) {}
  const restaurants = await Knex("restaurants").select(["name", "created_at","id"]).where({ area_id });

  return { length: restaurants.length, restaurants };
};

export const getAllRestaurants = async (req, res) => {
  const { area_id } = req.params;

  try {
    const result = await checkFoodAreaExists(area_id);
    if (result.error) {
      return res.status(result.error.status).json(result);
    }

    const restaurants = await getAll(area_id);

    return res.status(StatusCodes.OK).json(restaurants);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
