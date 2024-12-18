import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";

//#region
const checkUser = async (id) => await Knex("users").where({ id }).first();
const checkCart = async (id) => await Knex("cart").where({ id }).first();

const hasItemOnRestaurant = async (restaurant_id, id) =>
    await Knex("menu_item").where({ restaurant_id, id }).first();

//#endregion

const updateCartFromDatabase = async (cart_id, items) => {

    try {
        const cart = items.map(async (i) => {
            console.log(i);
            
            const [cart] = await Knex("cart")
                // .first()
                .where({ id: cart_id, })
                // .update({ quantity: i.quantity })
                .returning("*");

        console.log(cart);
        
            // return cart;
        });
        // const [cart] = await Knex("cart")
        //     .first()
        //     .where({ id: cart_id })
        //     .update({ quantity })
        //     .returning("*");

        return {
            cart,
        };
    } catch (error) {
        console.log(error);

        throw {
            status: StatusCodes.BAD_REQUEST,
            error: "erro ao criar o carrinho",
        };
    }
};

export const updateCart = async (req, res) => {
    try {
        const { credentials, body } = req;
        const { cart_id, items } = body;

        const user = await checkUser(credentials.id);

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "usuário não encontrado" });
        }

        const cart = await checkCart(cart_id);

        if (!cart) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "nenhum carrinho encontrado" });
        }

        const updatedCart = await updateCartFromDatabase(cart_id, items);

        return res.status(StatusCodes.OK).json(updatedCart);
    } catch (e) {
        return handleError({ r: res, e });
    }
};
