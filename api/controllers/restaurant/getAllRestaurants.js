import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";

const getAll = async (id) => Knex("restaurants").select("*");

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await getAll();

    return res.status(StatusCodes.OK).json(restaurants);
  } catch (e) {
    return handleError({ r: res, e: error });
  }
};
