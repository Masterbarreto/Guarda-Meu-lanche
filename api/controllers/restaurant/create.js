import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { handleError } from "../handlers/handleServerError.js";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRATION;

export const createValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      name: yup.string().required().max(100),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const createToken = async (restaurant) => {
  const token = await jwt.sign(
    {
      id: restaurant.id,
      name: restaurant.name,
      role: "restaurant",
    },
    secret,
    { expiresIn }
  );

  return token;
};
const createRestaurant = async (body) => {
  const { name } = body;

  try {
    const [restaurant] = await Knex("restaurants").insert({ name }).returning("id");
    const { id } = restaurant;
    const token = await createToken({ id, name });
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
      id,
      token,
      expires_at: new Date(tokenDecoded.exp * 1000),
    };
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
    const response = await createRestaurant(req.body);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (e) {
    return handleError({ r: res, e: error });
  }
};
