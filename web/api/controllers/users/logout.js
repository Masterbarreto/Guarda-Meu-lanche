import { StatusCodes } from "http-status-codes";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";

const deleteToken = async (id) => {
    const isDeleted = await Knex("tokens")
        .where({ user_id: id })
        .first()
        .delete();
    return isDeleted > 0 ? true : false;
};
export const logout = async (req, res) => {
    try {
        const { id } = req.credentials;
        const deletedToken = await deleteToken(id);

        if (!deletedToken) {
            return res.status(StatusCodes.OK).json({
                error: {
                    message: "login não encontrado.",
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                },
            });
        }
        return res.status(StatusCodes.OK).json({
            message: "ok",
            status: StatusCodes.OK,
            deletedToken,
        });
    } catch (e) {
        handleError({ r: res, e });
    }
};
