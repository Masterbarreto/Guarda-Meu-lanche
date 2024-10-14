import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";

export const createValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      name: yup.string().required().max(70),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const createFoodArea = async (body) => {
  const { name } = body;

  try {
    const [food_area] = await Knex("food_area").insert({ name }).returning("id");

    return food_area;
  } catch (e) {
    console.log(e);
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao tentar criar um restaurante",
    };
  }
};

export const create = async (req, res) => {
  try {
    const response = await createFoodArea(req.body);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (e) {
    return handleError({ r: res, e});
  }
};
