import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "./shared/checkFoodAreaExists.js";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRATION;

export const createValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      name: yup.string().required().max(100),
      area_id: yup.number().required().positive(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const createToken = async (restaurant) => {
  const token = await jwt.sign(
    {
      id: restaurant.id,
      name: restaurant.name,
      role: "restaurant",
      area_id: restaurant.area_id,
    },
    secret,
    { expiresIn }
  );

  return token;
};
const createRestaurant = async (body, area_id) => {
  const { name } = body;

  try {
    const [restaurant] = await Knex("restaurants")
      .insert({ name, area_id })
      .returning(["id", "area_id"]);

    const { id } = restaurant;

    const token = await createToken({ id, name, area_id });
    const tokenDecoded = jwt.decode(token);

    await Knex("tokens")
      .insert({
        token,
        restaurant_id: restaurant.id,
        type: "restaurant",
        expires_at: new Date(tokenDecoded.exp * 1000),
      })
      .returning(["id", "expires_at"]);

    return {
      id: restaurant.id,
      area_id: restaurant.area_id,
      token,
      expires_at: new Date(tokenDecoded.exp * 1000),
    };
  } catch (e) {
    console.log(e);
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao tentar criar uma lanchonete.",
    };
  }
};

export const create = async (req, res) => {
  try {
    const area_id = req.body.area_id;
    const result = await checkFoodAreaExists(area_id, res);

    if (result.error) {
      return res.status(result.error.status).json(result);
    }

    const response = await createRestaurant(req.body, area_id);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
