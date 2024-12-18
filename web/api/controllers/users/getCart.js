import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";

//#region
const checkUser = async (id) => await Knex("users").where({ id }).first();
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
const getCartFromDatabase = async (user_id) => {
    try {
        const cart = await Knex("cart")
            .join("menu_item", "cart.menu_item_id", "menu_item.id")
            .join("restaurants", "cart.restaurant_id", "restaurants.id") // Junção com a tabela restaurants
            .where({ "cart.user_id": user_id })
            .select(
                "menu_item.*", // Seleciona todas as colunas de menu_item
                "cart.*", // Seleciona todas as colunas de cart
                "restaurants.area_id",
                "restaurants.name as restaurant_name", // Nome da lanchonete
                Knex.raw("cart.quantity * menu_item.price as total_price") // Calcula o preço total
            );

        const groupedCart = cart.reduce((acc, item) => {
            if (!acc[item.restaurant_id]) {
                acc[item.restaurant_id] = {
                    restaurant_id: item.restaurant_id,
                    restaurant_name: item.restaurant_name,
                    restaurant_area: item.area_id,
                    cart_id: item.id,
                    items: [],
                };
            }

            acc[item.restaurant_id].items.push({
                menu_item_id: item.menu_item_id,
                name: item.name,
                desc: item.desc,
                image_url: item.url, // Assumindo que a URL da imagem está presente na tabela menu_item
                price: item.price,
                quantity: item.quantity,
                total_price: item.total_price,
            });

            return acc;
        }, {});

        return {
            length: cart.length,
            cart: Object.values(groupedCart),
        };
    } catch (error) {
        console.log(error);

        throw {
            status: StatusCodes.BAD_REQUEST,
            error: "erro ao criar o carrinho",
        };
    }
};

export const getCart = async (req, res) => {
    try {
        const { credentials } = req;

        const user = await checkUser(credentials.id);

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "usuario não encontrado" });
        }

        const cart = await getCartFromDatabase(credentials.id);

        if (!cart) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "nenhum carrinho encontrado" });
        }

        return res.status(StatusCodes.OK).json(cart);
    } catch (e) {
        console.log(222);

        return handleError({ r: res, e });
    }
};
