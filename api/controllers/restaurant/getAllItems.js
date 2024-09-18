import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";

export const createQueryValidation = validation((schema) => ({
  query: yup
    .object()
    .shape({
      name: yup.string().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const findItems = async (body) => {
  try {
    const items = await Knex("menu_item").where(body).returning("id");
    return { length: items.length, items };
  } catch (e) {
    console.log(e);
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao buscar os items",
    };
  }
};

const checkRestaurant = async (id) => Knex("restaurants").where({ id }).first();

export const getAllItems = async (req, res) => {
  const { id } = req.params;
  const restaurant = await checkRestaurant(id);

  if (!restaurant) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "lanchonete não encontrada" });
  }

  try {
    const items = await findItems({
      restaurant_id: id,
    });

    return res.status(StatusCodes.CREATED).json(items);
  } catch (e) {
    if (e.status) {
      return res.status(e.status).json(e);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "erro interno do servidor, por favor tente novamente mais tarde.",
    });
  }
};
