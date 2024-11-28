import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";
import { StatusCodes } from "http-status-codes";

const getAllAreas = async () =>
    await Knex("food_area")
        .leftJoin("restaurants", "food_area.id", "restaurants.area_id")
        .select("food_area.id", "food_area.name")
        .count("restaurants.id as restaurant_count")
        .groupBy("food_area.id", "food_area.name");

export const getAll = async (req, res) => {
    try {
        const areas = await getAllAreas();

        if (!areas) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: {
                    message: "nenhuma praça de alimentação encontrada.",
                    status: StatusCodes.NOT_FOUND,
                },
            });
        }

        return res.status(StatusCodes.OK).json({ length: areas.length, areas });
    } catch (e) {
        console.log(e);

        handleError({ r: res, e });
    }
};
