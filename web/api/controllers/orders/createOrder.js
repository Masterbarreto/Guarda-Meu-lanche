import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import yup from "yup";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";


//#region validation
const arraySchema = yup.object().shape({
  item_id: yup.number().positive().integer().positive(),
  quantity: yup.number().positive().integer().positive(),
});

export const createOrderValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      restaurant_id: yup.number().required(),
      items: yup.array().of(arraySchema),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

//#endregion

//#region
const checkUser = async (id) => await Knex("users").where({ id }).first();
const checkRestaurant = async (id) => await Knex("restaurants").where({ id }).first();

//#endregion

const validateItems = async (body) => {
  const { items, restaurant_id } = body;

  const itemsWithError = [];
  const noHasItems = items.map(async (i) => {
    const { menu_item_id } = i;
    const result = await Knex("menu_item")
      .where({ id: menu_item_id, restaurant_id: restaurant_id })
      .first();

    if (!result) {
      itemsWithError.push(menu_item_id);
    }
  });

  await Promise.all(noHasItems);
  return itemsWithError;
};

const getTotalPrice = async (item) => {
  let totalOrderPrice = 0;

  const getDatabasePrice = item.map(async (i) => {
    const quantity = i.quantity;

    const [item_price] = await Knex("menu_item")
      .where({ id: i.menu_item_id })
      .select("price");

    const totalItemPrice = quantity * Number(item_price.price);
    totalOrderPrice += totalItemPrice;
  });

  await Promise.all(getDatabasePrice);

  return totalOrderPrice;
};
const createOrderRequest = async (orderRequest) => {
  const { restaurant_id, user_id, items } = orderRequest;

  try {
    const total_price = await getTotalPrice(items);
    const [order] = await Knex("food_order")
      .insert({
        restaurant_id,
        user_id,
        status: "created",
        total_price,
      })
      .returning(["id", "status", "order_date", "total_price"]);

    await addItems(items, order.id);
    const orderItems = await getOrderItems(order.id)
    order.items= orderItems
    return order;
  } catch (error) {
    console.log(error);
    
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao criar o pedido",
    };
  }
};

const addItems = async (items, order_id) => {
  try {
    const insertPromises = items.map(
      async (i) =>
        await Knex("order_items").insert({
          order_id,
          menu_item_id: i.menu_item_id,
          quantity: i.quantity,
        })
    );

    await Promise.all(insertPromises);
  } catch (error) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: "erro ao adicionar os itens ao pedido",
    };
  }
};

const getOrderItems = async (order_id) => {
  return await Knex("order_items")
    .join("menu_item", "order_items.menu_item_id", "menu_item.id")
    .where("order_items.order_id", order_id)
    .select("menu_item.name", "menu_item.price", "order_items.quantity","desc","url");
};

export const createOrder = async (req, res) => {
  try {
    const { credentials, body } = req;
    const { restaurant_id } = body;

    const user = await checkUser(credentials.id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "usuario não encontrado" });
    }

    const restaurant = await checkRestaurant(restaurant_id);

    if (!restaurant) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "restaurante não encontrado" });
    }

    const itemsWithError = await validateItems(body);
    if (itemsWithError.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message: "items nao encontrados ou não pertencem ao restaurante",
          items: itemsWithError,
        },
      });
    }
    const order = await createOrderRequest({
      user_id: credentials.id,
      restaurant_id: String(restaurant_id),
      items: body.items,
    });

    return res.status(StatusCodes.CREATED).json(order);
  } catch (e) {
    return handleError({ r: res, e });
  }
};
