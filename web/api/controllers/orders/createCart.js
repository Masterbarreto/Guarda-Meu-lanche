import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import yup from "yup";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";

//#region validation
const arraySchema = yup.object().shape({
    id: yup.number().positive().integer().positive(),
    quantity: yup.number().positive().integer().positive(),
});

export const cartValidation = validation((schema) => ({
    body: yup
        .object()
        .shape({
            restaurant_id: yup.number().required(),
            item: yup
                .object()
                .shape({
                    id: yup.number().positive().integer().positive().required(),
                    quantity: yup
                        .number()
                        .positive()
                        .integer()
                        .positive()
                        .required(),
                })
                .required(),
        })
        .noUnknown(true, "chaves adicionais não são permitidas."),
}));

//#endregion

//#region
const checkUser = async (id) => await Knex("users").where({ id }).first();

const checkCart = async (item_id, restaurant_id) =>
    await Knex("cart").where({ menu_item_id: item_id, restaurant_id }).first();

const updateCart = async (item) => {
    const cart = await Knex("cart").where({ menu_item_id: item.id }).first();
    const quantity = cart.quantity + item.quantity;
    const newCart = await Knex("cart")
        .where({ menu_item_id: item.id })
        .update({ quantity })
        .returning("*");


    newCart.total_price = "newCart.quantity * newCart.quantity;";
    return {
        cart: newCart,
    };
};
const checkRestaurant = async (id) =>
    await Knex("restaurants").where({ id }).first();

const hasItemOnRestaurant = async (restaurant_id, id) =>
    await Knex("menu_item").where({ restaurant_id, id }).first();

//#endregion

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
const createCartOnDatabase = async (restaurant_id, item, user_id) => {
    try {
        const [cart] = await Knex("cart")
            .insert({
                restaurant_id,
                user_id,
                menu_item_id: item.id,
                quantity: item.quantity,
            })
            .returning("*");

        return cart;
    } catch (error) {
        console.log(error);

        throw {
            status: StatusCodes.BAD_REQUEST,
            error: "erro ao criar o carrinho",
        };
    }
};

export const createCart = async (req, res) => {
    try {
        const { credentials, body } = req;
        const { restaurant_id, item } = body;

        const user = await checkUser(credentials.id);

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "usuario não encontrado" });
        }

        const restaurant = await checkRestaurant(restaurant_id);
        let cart;
        if (!restaurant) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "restaurante não encontrado" });
        }

        const cartExists = await checkCart(item.id, restaurant_id);
        if (cartExists) {
            cart = await updateCart(item);
            return res.status(StatusCodes.OK).json(cart);
        }
        const hasItem = await hasItemOnRestaurant(restaurant_id, item.id);

        if (!hasItem) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "lanche não encontrado" });
        }

        cart = await createCartOnDatabase(restaurant_id, item, credentials.id);

        return res.status(StatusCodes.OK).json(cart);
    } catch (e) {
        return handleError({ r: res, e });
    }
};
