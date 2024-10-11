import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import yup from "yup";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "../restaurant/shared/checkFoodAreaExists.js";

export const restaurantGetItemValidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      area_id: yup.number().optional(),
      restaurant_id: yup.number().optional(),
      item_id: yup.number().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const checkRestaurant = async (restaurant_id, area_id) =>
  await Knex("restaurants").where({ id: restaurant_id, area_id }).first();

const findItems = async (restaurant_id) => {
  const items = await Knex("menu_item")
    .select(["name", "price", "id", "url", "desc"])
    .where({ restaurant_id });

  return {
    length: items.length,
    items,
  };
};

const findItemById = async (restaurant_id, item_id) => {
  const item = await Knex("menu_item").where({ restaurant_id, id: item_id }).first()
  return item;
};

export const getRestaurantItemById = async (req, res) => {
  try {
    const { restaurant_id, area_id, item_id } = req.params;

    const result = await checkFoodAreaExists(area_id);
    if (result.error) {
      return res.status(result.error.status).json(result);
    }

    const restaurant = await checkRestaurant(restaurant_id, area_id);
    if (!restaurant) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: "lanchonete não encontrada.",
          status: StatusCodes.NOT_FOUND,
        },
      });
    }

    const items = await findItems(restaurant_id);
    if (!items) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: "items não encontrado na lanchonete.",
          status: StatusCodes.NOT_FOUND,
        },
      });
    }
    
    if (items.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: "lanchonete ainda não possui items no menu.",
          status: StatusCodes.OK,
        },
      });
    }

    const item = await findItemById(restaurant_id, item_id);
    if (!item) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: {
              message: "item não encontrado.",
              status: StatusCodes.NOT_FOUND,
            },
          });
    }

    return res.status(StatusCodes.OK).json(item);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
