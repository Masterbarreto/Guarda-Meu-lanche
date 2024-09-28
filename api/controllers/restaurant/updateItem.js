import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";
import { checkFoodAreaExists } from "./shared/checkFoodAreaExists.js";

const maxDecimals = (value) => {
  if (value === undefined || value === null || value === "") {
    return false;
  }
  const regex = /^\d+\.\d{2}$/;
  return regex.test(value.toString());
};

export const updateValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      name: yup.string().optional(),
      desc: yup.string().max("250").optional(),
      price: yup
        .number()
        .optional()
        .positive()
        .test("max-decimals", "o preço precisa ter duas casas decimais", (value) =>
          maxDecimals(value, 2)
        ),
      url: yup.string().url().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
  params: yup.object().shape({
    item_id: yup.number(),
  }),
}));

const updateItem = async (body) => {
  const { id } = body;
  try {
    const [item] = await Knex("menu_item")
      .where({ id })
      .update({ ...body })
      .returning(["name", "desc", "price", "url", "id"]);
    return item;
  } catch (e) {
    console.log(e);
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao buscar os items",
    };
  }
};

const checkRestaurant = async (id, area_id) =>
  Knex("restaurants").where({ id, area_id }).first();

const checkItem = async (id) => Knex("menu_item").where({ id }).first();

export const update = async (req, res) => {
  const { body } = req;

  const { item_id } = req.params;
  const { area_id, id } = req.credentials;

  const area = await checkFoodAreaExists(area_id);

  if (area.error) {
    return res.status(area.error.status).json(area);
  }
  const restaurant = await checkRestaurant(id, area_id);

  if (!restaurant) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "lanchonete não encontrada" });
  }
  if (restaurant.id !== req.credentials.id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "não autorizado" });
  }

  const item = await checkItem(item_id);

  if (!item) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "item não encontrado" });
  }

  try {
    const items = await updateItem({
      id: item_id,
      ...body,
    });

    return res.status(StatusCodes.OK).json(items);
  } catch (e) {
    return handleError({ r: res, e: error });
  }
};
