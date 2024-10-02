import { StatusCodes } from "http-status-codes";
import { Knex } from "../../../knex/knex.js";

export const checkFoodAreaExists = async (area_id) => {
  try {
    const area = await Knex("food_area").where({ id: area_id }).first();

    if (!area) {
      return {
        error: {
          message: "praça de alimentação não encontrada.",
          status: StatusCodes.NOT_FOUND,
        },
      };
    }

    return { exists: true };
  } catch (error) {
console.log(error);

    return {
      error: {
        message: "erro ao tentar buscar a praça.",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    };
  }
};
