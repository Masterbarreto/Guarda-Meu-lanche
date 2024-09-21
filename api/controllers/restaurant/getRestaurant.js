import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import yup from "yup";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";

export const createRestaurantValidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      id: yup.number().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const findRestaurant = async (restaurant) => {
  try {
    const notFound = {
      error: {
        message: "restaurante não encontrado.",
        status: StatusCodes.NOT_FOUND,
      },
    };
    const response = await Knex("restaurants").where({ id: restaurant }).first();
    return response || notFound;
  } catch (error) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao buscar o restaurante",
    };
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await findRestaurant(id);
    return res.status(StatusCodes.OK).json(restaurant);
  } catch (error) {
    return handleError({ r: res, e: error });
  }
};
