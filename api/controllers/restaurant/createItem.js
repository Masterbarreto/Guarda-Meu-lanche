import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const maxDecimals = (value) => {
  if (value === undefined || value === null || value === "") {
    return false;
  }
  const regex = /^\d+\.\d{2}$/;
  return regex.test(value.toString());
};

export const createItemValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      name: yup.string().required(),
      desc: yup.string().max("250").required(),
      price: yup
        .number()
        .required()
        .positive()
        .test("maxDecimals", "o preço precisa ter duas casas decimais",maxDecimals),
      url: yup.string().url().required(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
  params: yup
    .object()
    .shape({
      id: yup.number().required(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const decodeToken = (token) => jwt.decode(token);

const create = async (body) => {
  const { price, name, desc, url, restaurant_id } = body;
  try {
    const [item] = await Knex("menu_item")
      .insert({ restaurant_id, price, name, desc, url })
      .returning("id");
    return item;
  } catch (e) {
    console.log(e);
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao criar o item",
    };
  }
};

const checkRestaurant = async (id) => Knex("restaurants").where({ id }).first();

export const createItem = async (req, res) => {
  const { id } = req.params;
  const restaurant = await checkRestaurant(id);

  if (!restaurant) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "lanchonete não encontrada" });
  }

  if (restaurant.id !== req.credentials.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "não autorizado" });
  }

  try {
    const response = await create({
      restaurant_id: req.credentials.id,
      ...req.body,
    });
    return res.status(StatusCodes.CREATED).json(response);
  } catch (e) {
    if (e.status) {
      return res.status(e.status).json(e);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "erro interno do servidor, por favor tente novamente mais tarde.",
    });
  }
};
